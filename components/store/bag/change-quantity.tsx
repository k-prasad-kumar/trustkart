"use client";

import { Button } from "@/components/ui/button";
import { fetchProductBySlug } from "@/lib/actions/product-actions";
import { updateQuantity } from "@/lib/actions/user-actions";
import { Minus, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const ChangeQuantity = ({
  id,
  slug,
  itemSize,
  quantity,
}: {
  id: string;
  slug: string;
  itemSize: string;
  quantity: number;
}) => {
  const [size, setSize] = useState<{ size: string; stock: number }>();
  const [warning, setWarning] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const getSizes = () => {
    fetchProductBySlug(slug)
      .then((data) => {
        data?.sizes.map((sizeValue) => {
          if (sizeValue.size === itemSize) {
            setSize(sizeValue);
            if (sizeValue.stock === 0) {
              setWarning("out of stock");
            } else if (sizeValue.stock <= 5) {
              setWarning(`Only ${sizeValue.stock} left`);
            }
          }
          return;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const quantityUpdate = async (id: string, quantity: number) => {
    startTransition(() => {
      updateQuantity(id, quantity)
        .then((data) => {
          if (data?.success) {
            return;
          } else {
            toast.error(data?.error);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleQuantity = (type: string) => {
    getSizes();
    if (!size) return;
    if (type === "plus") {
      if (quantity >= size?.stock!) return;
      if (quantity >= 5) return;
      quantityUpdate(id, quantity + 1);
      return;
    } else if (type === "minus") {
      if (quantity <= 1) return;
      quantityUpdate(id, quantity - 1);
      return;
    }
  };
  return (
    <>
      <div className="flex gap-2 items-center">
        <Button
          variant={"ghost"}
          className="p-3 border cursor-pointer"
          onClick={() => handleQuantity("minus")}
          disabled={isPending || quantity <= 1}
        >
          <Minus size={14} />
        </Button>
        <p className="px-2">{quantity}</p>
        <Button
          variant={"ghost"}
          className="p-3 border cursor-pointer"
          onClick={() => handleQuantity("plus")}
          disabled={isPending || quantity >= size?.stock! || quantity >= 5}
        >
          <Plus size={14} />
        </Button>
        {warning && <p className="text-[#ff905a] text-sm">{warning}</p>}
      </div>
    </>
  );
};
