import { IAnalyticsData, IAnalyticsFilter } from "@/interfaces/analytics.interface";

const formatVND = (v: number) => v.toLocaleString("vi-VN") + " đ";
const formatNum = (v: number) => v.toLocaleString("vi-VN");

const calcChange = (value: number, prev: number) =>
  !prev ? 0 : ((value - prev) / prev) * 100;

const changeText = (value: number, prev: number) => {
  const c = calcChange(value, prev);
  const arrow = c >= 0 ? "▲" : "▼";
  return `${arrow} ${Math.abs(c).toFixed(1)}%`;
};

// Tính khoảng "Từ ngày - Đến ngày" + mô tả kỳ trước (giống Shopee)
function getPeriod(filter: IAnalyticsFilter) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

  if (filter.level === "day") {
    const d = new Date(filter.day);
    const prev = new Date(d);
    prev.setDate(prev.getDate() - 1);
    return {
      label: `Ngày ${fmt(d)}`,
      from: fmt(d),
      to: fmt(d),
      prevLabel: `Ngày ${fmt(prev)} (ngày liền trước)`,
    };
  }
  if (filter.level === "year") {
    const y = filter.year;
    return {
      label: `Năm ${y}`,
      from: `01/01/${y}`,
      to: `31/12/${y}`,
      prevLabel: `Năm ${y - 1} (năm liền trước)`,
    };
  }
  // month
  const y = filter.year;
  const m = filter.month;
  const lastDay = new Date(y, m, 0).getDate();
  const prevM = m === 1 ? 12 : m - 1;
  const prevY = m === 1 ? y - 1 : y;
  return {
    label: `Tháng ${m}/${y}`,
    from: `01/${pad(m)}/${y}`,
    to: `${pad(lastDay)}/${pad(m)}/${y}`,
    prevLabel: `Tháng ${prevM}/${prevY} (tháng liền trước)`,
  };
}

export function describeFilter(filter: IAnalyticsFilter): string {
  return getPeriod(filter).label;
}

// Bọc ô CSV an toàn
const cell = (v: string | number) => {
  const s = String(v ?? "");
  return s.includes(",") || s.includes('"')
    ? `"${s.replace(/"/g, '""')}"`
    : s;
};
const row = (...cells: (string | number)[]) => cells.map(cell).join(",");

export function exportToCSV(data: IAnalyticsData, filter: IAnalyticsFilter) {
  const lines: string[] = [];
  const period = getPeriod(filter);
  const printedAt = new Date().toLocaleString("vi-VN");

  // ===== HEADER (kiểu Shopee) =====
  lines.push(row("BÁO CÁO PHÂN TÍCH BÁN HÀNG - SKINTIFY"));
  lines.push("");
  lines.push(row("Chi tiết báo cáo"));
  lines.push(row("Kỳ báo cáo:", period.label));
  lines.push(row("Từ ngày:", period.from));
  lines.push(row("Đến ngày:", period.to));
  lines.push(row("So sánh với:", period.prevLabel));
  lines.push(row("Ngày xuất:", printedAt));
  lines.push("");

  // ===== I. CHỈ SỐ TỔNG QUAN =====
  lines.push(row("I. CHỈ SỐ TỔNG QUAN"));
  lines.push(row("Chỉ số", "Kỳ này", "Kỳ trước", "Thay đổi"));
  data.kpis.forEach((k) => {
    const val = k.format === "currency" ? formatVND(k.value) : formatNum(k.value);
    const prev =
      k.format === "currency" ? formatVND(k.prevValue) : formatNum(k.prevValue);
    lines.push(row(k.label, val, prev, changeText(k.value, k.prevValue)));
  });
  lines.push("");

  // ===== II. CƠ CẤU DOANH THU THEO DANH MỤC =====
  lines.push(row("II. CƠ CẤU DOANH THU THEO DANH MỤC"));
  lines.push(row("Danh mục", "Doanh thu", "Tỷ trọng (%)"));
  const totalCat = data.categoryShare.reduce((s, c) => s + c.value, 0);
  if (data.categoryShare.length === 0) {
    lines.push(row("(Không có dữ liệu)"));
  } else {
    data.categoryShare.forEach((c) => {
      const pct = totalCat ? ((c.value / totalCat) * 100).toFixed(1) : "0";
      lines.push(row(c.name, formatVND(c.value), pct + "%"));
    });
    lines.push(row("TỔNG CỘNG", formatVND(totalCat), "100%"));
  }
  lines.push("");

  // ===== III. XU HƯỚNG DOANH THU CHI TIẾT =====
  lines.push(row("III. XU HƯỚNG DOANH THU CHI TIẾT"));
  lines.push(row("Thời điểm", "Doanh thu", "Số đơn", "Giá trị đơn TB"));
  let sumRevenue = 0;
  let sumOrders = 0;
  if (data.revenueTrend.length === 0) {
    lines.push(row("(Không có dữ liệu)"));
  } else {
    data.revenueTrend.forEach((p) => {
      const avg = p.orders ? Math.round(p.revenue / p.orders) : 0;
      lines.push(row(p.label, formatVND(p.revenue), formatNum(p.orders), formatVND(avg)));
      sumRevenue += p.revenue;
      sumOrders += p.orders;
    });
    const avgAll = sumOrders ? Math.round(sumRevenue / sumOrders) : 0;
    lines.push(
      row("TỔNG CỘNG", formatVND(sumRevenue), formatNum(sumOrders), formatVND(avgAll))
    );
  }
  lines.push("");

  // ===== IV. SẢN PHẨM BÁN CHẠY =====
  lines.push(row("IV. SẢN PHẨM BÁN CHẠY"));
  lines.push(row("STT", "Tên sản phẩm", "Danh mục", "Số lượng bán", "Doanh thu"));
  if (data.topProducts.length === 0) {
    lines.push(row("(Không có dữ liệu trong kỳ này)"));
  } else {
    data.topProducts.forEach((p, i) => {
      lines.push(
        row(i + 1, p.name, p.category, formatNum(p.sold), formatVND(p.revenue))
      );
    });
    const totalSold = data.topProducts.reduce((s, p) => s + p.sold, 0);
    const totalRev = data.topProducts.reduce((s, p) => s + p.revenue, 0);
    lines.push(row("", "TỔNG CỘNG", "", formatNum(totalSold), formatVND(totalRev)));
  }
  lines.push("");

  // ===== V. NHẬN XÉT TỰ ĐỘNG =====
  lines.push(row("V. NHẬN XÉT"));
  const revKpi = data.kpis.find((k) => k.label === "Doanh thu");
  if (revKpi) {
    const c = calcChange(revKpi.value, revKpi.prevValue);
    const trend = c >= 0 ? "tăng" : "giảm";
    lines.push(row(`- Doanh thu ${trend} ${Math.abs(c).toFixed(1)}% so với kỳ trước.`));
  }
  const bestProduct = data.topProducts[0];
  if (bestProduct) {
    lines.push(
      row(`- Sản phẩm bán chạy nhất: ${bestProduct.name} (${formatNum(bestProduct.sold)} sản phẩm).`)
    );
  }
  if (data.categoryShare[0]) {
    lines.push(row(`- Danh mục chủ lực: ${data.categoryShare[0].name}.`));
  }
  lines.push("");
  lines.push(row("--- Hết báo cáo ---"));
  lines.push(row("Lưu ý: Báo cáo chỉ tính các đơn đã xác nhận/đang giao/đã giao."));

  // ===== Xuất file =====
  const csv = "\uFEFF" + lines.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  const tag =
    filter.level === "day"
      ? filter.day
      : filter.level === "month"
      ? `${filter.year}-${String(filter.month).padStart(2, "0")}`
      : `${filter.year}`;
  a.download = `bao-cao-analytics-${tag}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToPrint() {
  window.print();
}
