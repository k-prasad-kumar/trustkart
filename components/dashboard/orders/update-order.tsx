"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { updateOrderStatus } from "@/lib/actions/user-actions";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export const UpdateOrder = ({
  id,
  name,
  image,
  price,
  orderStatus,
}: {
  id: string;
  image: string;
  name: string;
  price: number;
  orderStatus: string;
}) => {
  const [status, setStatus] = useState("");

  const handleStatus = (id: string) => {
    if (orderStatus === "Delivered") {
      toast.info("Please select a status");
      return;
    }

    updateOrderStatus(id, status)
      .then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success(data?.success);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <Pencil size={14} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex gap-4 items-center">
            <Image
              src={image}
              width={100}
              height={100}
              alt="product"
              sizes="100%"
            />

            <div className="h-full text-left">
              <DialogTitle className="text-sm">{name}</DialogTitle>
              <DialogDescription>Rs. {price}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Separator />
        {orderStatus === "Delivered" && (
          <>
            <p>Order is already delivered</p>
          </>
        )}
        <RadioGroup defaultValue="Order Confirmed">
          {orderStatus === "Order Confirmed" && (
            <>
              <div
                className="flex items-center space-x-2"
                onClick={() => setStatus("Shipped")}
              >
                <RadioGroupItem value="Shipped" id="r1" />
                <Label htmlFor="r1">Shipped</Label>
              </div>
              <div
                className="flex items-center space-x-2"
                onClick={() => setStatus("Out For Delivery")}
              >
                <RadioGroupItem value="Out For Delivery" id="r2" />
                <Label htmlFor="r2">Out For Delivery</Label>
              </div>
              <div
                className="flex items-center space-x-2"
                onClick={() => setStatus("Delivered")}
              >
                <RadioGroupItem value="Delivered" id="r3" />
                <Label htmlFor="r3">Delivered</Label>
              </div>
            </>
          )}
          {orderStatus === "Shipped" && (
            <>
              <div
                className="flex items-center space-x-2"
                onClick={() => setStatus("Out For Delivery")}
              >
                <RadioGroupItem value="Out For Delivery" id="r1" />
                <Label htmlFor="r1">Out For Delivery</Label>
              </div>
              <div
                className="flex items-center space-x-2"
                onClick={() => setStatus("Delivered")}
              >
                <RadioGroupItem value="Delivered" id="r2" />
                <Label htmlFor="r2">Delivered</Label>
              </div>
            </>
          )}
          {orderStatus === "Out For Delivery" && (
            <>
              <div
                className="flex items-center space-x-2"
                onClick={() => setStatus("Delivered")}
              >
                <RadioGroupItem value="Delivered" id="r2" />
                <Label htmlFor="r2">Delivered</Label>
              </div>
            </>
          )}
        </RadioGroup>

        {orderStatus !== "Delivered" && (
          <DialogFooter className="flex items-center flex-row justify-end">
            <Button
              variant={"ghost"}
              className="text-primary"
              onClick={() => handleStatus(id)}
            >
              Update
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
