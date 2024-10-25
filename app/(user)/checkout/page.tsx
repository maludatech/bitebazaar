"use client";

import { useMemo, useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";
import Footer from "@/components/Footer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CheckOut = () => {
  const { user } = useAuthContext();
  const { cart } = useCartContext();
  const router = useRouter();

  const [selectedDelivery, setSelectedDelivery] = useState<keyof typeof deliveryFee | null>(null);

  const deliveryFee = {
    "Lekki1": 2000,
    "Lekki2":3000,
    "mainland1": 3000,
    "mainland2": 4000
  };

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (!user && !isLoggedIn) {
      router.push('/login');
    }
  }, [user, router]);

  // Calculate the subtotal by summing the price * quantity for each product
  const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  // Table columns definition
  const columns = useMemo<ColumnDef<CartItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: (info: any) => (
          <span>
            {info.getValue()} x {info.row.original.quantity}
          </span>
        ),
      },
      {
        accessorKey: "subtotal",
        header: "Subtotal",
        cell: (info) => {
          const row = info.row.original;
          return <span>NGN{row.price * row.quantity}.00</span>;
        },
      },
    ],
    []
  );

  // Table data
  const data = useMemo(() => cart, [cart]);

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="pt-20 font-roboto">
      <div className="body-container p-4 px-8 flex flex-col gap-6">
        <h1 className="py-8 text-center font-bold text-5xl lg:text-6xl">CHECKOUT</h1>

        {/* Billing details section */}
        <div className="flex flex-col gap-10 sm:flex-row">
          <div className="flex flex-col gap-2 text-[#444444] w-full">
            <h1 className="font-medium text-3xl leading-8 pb-8">Billing details</h1>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg uppercase">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                className="bg-[#f9f9f9] p-3 text-lg text-[#1c2123] border-[1px] border-[#e1e1e1] w-full mb-3"
                value={user?.fullName}
                readOnly
              />
              <label className="text-lg uppercase">
                Billing Address <span className="text-red-600">*</span>
              </label>
              <input
                className="bg-[#f9f9f9] p-3 text-lg text-[#1c2123] border-[1px] border-[#e1e1e1] w-full mb-3"
                value={user?.billingAddress}
              />
              <label className="text-lg uppercase">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                className="bg-[#f9f9f9] p-3 text-lg text-[#1c2123] border-[1px] border-[#e1e1e1] w-full mb-3"
                value={user?.phoneNumber}
              />
              <label className="text-lg uppercase">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                className="bg-[#f9f9f9] p-3 text-lg text-[#1c2123] border-[1px] border-[#e1e1e1] w-full mb-3"
                value={user?.email}
                readOnly
              />
            </div>
          </div>

          {/* Product and Shipping section */}
          <div className="flex flex-col gap-10 w-full">
            {/* Product and Subtotal Table */}
            <div className="border-[1px] w-full p-4 border-[#e1e1e1]">
              <h1 className="font-bold text-3xl pb-4">Order Summary</h1>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    {table.getHeaderGroups().map((headerGroup) =>
                      headerGroup.headers.map((header) => (
                        <th key={header.id} className="text-left p-2 font-semibold">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))
                    )}
                  </tr>
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-2">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-semibold">
                    <td className="p-2  py-4">Subtotal</td>
                    <td className="p-2  py-4">NGN{subtotal}.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Shipping section */}
            <div className="border-[1px] w-full py-4 px-2 border-[#e1e1e1] flex-col gap-5 text-sm">
            <div className="flex gap-5 justify-between w-full pb-6">
              <h1 className="font-bold text-xl w-full">Shipping</h1>
              <div className="flex flex-col gap-6 text-[#444444] font-semibold w-full">
                {Object.keys(deliveryFee).map((location) => (
                  <div key={location} className="flex items-center">
                    <input
                      type="radio"
                      id={location}
                      name="shipping"
                      className="mr-2 hover:cursor-pointer"
                      checked={selectedDelivery === location}
                      onChange={() => setSelectedDelivery(location as keyof typeof deliveryFee)}
                    />
                    <label htmlFor={location} className="uppercase">
                      {location}: NGN{deliveryFee[location as keyof typeof deliveryFee]}.00
                    </label>
                  </div>
                ))}
              </div>
            </div>
              <div className="flex justify-between border-t-2 pt-5 text-[16px] font-bold px-4">
                <h1 className="uppercase">Total:</h1>
                <h1>NGN{subtotal * deliveryFee}.00</h1>
              </div>
            </div>

          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
