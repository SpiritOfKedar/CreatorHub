import React from 'react';
import CheckoutBackButton from '@/src/components/Checkout/CheckoutBackButton';
import CheckoutSummary from '@/src/components/Checkout/CheckoutSummary';
import CheckoutPaymentForm from '@/src/components/Checkout/CheckoutPaymentForm';

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f4f1] w-full items-center justify-center">
      {/* Centered Main Layout Area */}
      <main className="flex relative w-full overflow-x-hidden max-w-[1280px]">
        
        {/* Container for Checkout elements */}
        <div className="flex gap-[124px] items-start w-full justify-center py-[100px]">
          
          {/* Left Column container */}
          <div className="flex flex-col gap-[32px] pt-[12px] relative top-[-60px]">
            {/* The absolute position of Back Button in Figma corresponds roughly to hovering over the start */}
            <div className="mb-[24px]">
              <CheckoutBackButton />
            </div>
            
            <CheckoutSummary 
              creatorName="Andrea Nelson"
              contentName="Content name / event name"
              price={80}
              tax={2}
            />
          </div>

          {/* Right Column (Form) */}
          <div className="pt-[20px]">
            <CheckoutPaymentForm />
          </div>
          
        </div>
        
      </main>
    </div>
  );
}
