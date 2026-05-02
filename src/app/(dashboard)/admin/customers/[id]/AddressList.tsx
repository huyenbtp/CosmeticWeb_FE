
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICustomerDetail } from "@/interfaces/customer.interface";

export default function AddressesTab({
  data,
}: {
  data: ICustomerDetail;
}) {
  return (
    <div className="gap-6">
      {data.userAddressList.map((item) => {
        return (
          <Card key={item._id}>
            <CardContent>
              <p>{item.receiver_name}</p>
              {item.is_default && (
                <div className="bg-secondary text-primary text-xs">
                  <p>Default</p>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}