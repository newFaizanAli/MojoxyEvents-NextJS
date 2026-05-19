"use client";

import { useEffect } from "react";
import { useUserStore } from "./store/user";

export default function ClientRoot({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const fetch = async () => {
            await useUserStore.getState().fetchCurrentUser();
        };

        fetch();
    }, []);

    return <>{children}</>;
}