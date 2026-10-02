import MessagePage from "../../common-pages/chat";
import { Suspense } from "react";

export default function page() {

  return <Suspense >
    <MessagePage/>
  </Suspense>

}