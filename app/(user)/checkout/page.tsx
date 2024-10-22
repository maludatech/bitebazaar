"use client";

import { useMemo, useEffect } from "react";
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

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (!user && !isLoggedIn) {
    router.push('/login');
    }
}, [user, router]);

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
      <div className="body-container p-4 flex flex-col gap-6">
        <h1 className="py-8 text-center font-bold text-5xl lg:text-6xl">CHECKOUT</h1>

        {/* Billing details section */}
        <div className="flex flex-col gap-12 sm:gap-6 sm:flex-row">
          <div className="flex flex-col gap-2 text-[#444444] w-full">
            <h1 className="font-medium text-3xl leading-8 pb-8">Billing details</h1>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg uppercase">Full Name <span className="text-red-600">*</span></label>
              <input
                className="bg-[#f9f9f9] p-3 text-lg text-[#1c2123] border-[1px] border-[#e1e1e1] w-full mb-3"
                value={user?.fullName}
                readOnly
              />
              <label className="text-lg uppercase">Billing Address <span className="text-red-600">*</span></label>
              <input
                className="bg-[#f9f9f9] p-3 text-lg text-[#1c2123] border-[1px] border-[#e1e1e1] w-full mb-3"
                value={user?.billingAddress}
              />
              <label className="text-lg uppercase">Phone Number <span className="text-red-600">*</span></label>
              <input
                className="bg-[#f9f9f9] p-3 text-lg text-[#1c2123] border-[1px] border-[#e1e1e1] w-full mb-3"
                value={user?.phoneNumber}
              />
              <label className="text-lg uppercase">Email Address <span className="text-red-600">*</span></label>
              <input
                className="bg-[#f9f9f9] p-3 text-lg text-[#1c2123] border-[1px] border-[#e1e1e1] w-full mb-3"
                value={user?.email}
                readOnly
              />
            </div>
          </div>

          {/* Product and Subtotal Table */}
          <div className="flex flex-col gap-2 w-full">
            <div className="border-[1px] w-full p-4 border-[#e1e1e1]">
              <h1 className="font-bold text-3xl pb-4">Order Summary</h1>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="text-left p-2 font-semibold"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
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
              </table>
            </div>
          </div>
        </div>

        {/* Shipping section */}
        <div className="flex flex-col gap-4">
          <div className="border-[1px] w-full p-2 border-[#e1e1e1] flex justify-between">
            <h1 className="font-bold text-xl">Shipping</h1>
            <div>
              <h1>Local pickup</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
