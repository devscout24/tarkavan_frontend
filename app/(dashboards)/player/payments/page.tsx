import PaymentPage from "../../common-pages/paument-page/payment-page";

import { Suspense } from "react";

export default function page() {
 
  return (
    <Suspense>
      <PaymentPage/>
    </Suspense>
  ) 
}
