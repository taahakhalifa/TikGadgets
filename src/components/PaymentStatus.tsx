"use client";

interface PaymentStatusProp {
    orderEmail: string;
    orderId: string;
    isPaid: boolean;
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProp) => {
    return (
        <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
            <div>
                <p className="font-mredium text-gray-900">Shipping To</p>
                <p>{orderEmail}</p>
            </div>
            <div className="font-medium text-gray-900">Order Status</div>
            <p>{isPaid ? "Payment successful" : "Pending Payment"}</p>
        </div>
    );
};

export default PaymentStatus;