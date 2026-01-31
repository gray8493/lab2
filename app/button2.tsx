"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Button2() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <Button onClick={() => setCount(count + 1)}>
                Button 2 clicked {count} times
            </Button>
        </div>
    )
}