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
  const { cart, deliveryFee } = useCartContext();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (!user && !isLoggedIn) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className="pt-20 font-roboto">
      <div className="body-container py-6 px-8 flex flex-col gap-6">

      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
