/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getUser } from "@/controllers";

type CardProps = React.ComponentProps<typeof Card>;

export function Home({ className, ...props }: CardProps) {
  const [data, setData] = useState<any>({});
  const { toast } = useToast();

  useEffect(() => {
    const getUserData = async () => {
      const subdomain = window.location.hostname.split(".")[0];
      if (subdomain) {
        const response = await getUser(subdomain);
        if (response?.data?.length) {
          setData(response.data[0]);
          toast({
            title: "Yaahoo, 🎉",
            description: "User Found",
          });
        } else {
          toast({
            title: "Opps, 😥",
            description: "User not Found",
          });
        }
      } else {
        toast({
          title: "Opps, 😥",
          description: "User not Found",
        });
      }
    };
    getUserData();
  }, [toast]);

  return (
    <div className="h-screen flex items-center justify-center">
      {data?.username ? (
        <Card className={cn("w-[380px]", className)} {...props}>
          <CardHeader>
            <CardTitle>{data?.username || ""}</CardTitle>
            <CardDescription>{data?.email || ""}</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className={cn("w-[380px]", className)} {...props}>
          <CardHeader>
            <CardTitle>Sorry, user not found</CardTitle>
            <CardDescription>Please enter correct domain name.</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
