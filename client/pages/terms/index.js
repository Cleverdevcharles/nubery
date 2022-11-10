import React from "react";
import Head from "next/head";

const Terms = () => {
  return (
    <div className="p-3 my-3 mx-8">
      <Head>
        <title>Terms of Use || Nubery</title>
      </Head>
      <h1 className="text-center font-bold text-6xl">Terms and Conditions</h1>
      <div>
        <p className="text-center italic">These Terms of Use ("Terms") were last updated on Nov. 10, 2022.</p>
        <p className=" mt-3 font-semibold">
          If you live in the United States or Canada, by agreeing to these
          Terms, you agree to resolve disputes with Nubery through binding
          arbitration (with very limited exceptions, not in court), and you
          waive certain rights to participate in class actions, as detailed in
          the Dispute Resolution section.
        </p>
      </div>

      <div>
        <ol className="list-decimal">
          <li>
            <h4 className="mt-3 font-bold">Accounts</h4>
            <p className="mt-2">
              You need an account for most of the activities on the Nubery
              platform. Both the students and the instructors most be about 18
              years old to create an account on Nubery or use any services on
              the platform. If you are youngr than 18 years the consent of your
              parent or guadian is required to create and choose contents
              appropriate for you.
            </p>
            <p className="mt-2">
              You are advised not to share your account login credentials with
              anyone else. You are responsible for whatever happens with your
              account and Nubery will not intervene in disputes between students
              or instructors who shared account login credentials. You must
              notify us immediately if someone else may be using your account
              without your permission (or if you suspect any other breach of
              security) by contacting our Support Team. We may request some
              information from you to confirm that you are indeed the owner of
              your account.
            </p>
            <p className="mt-2">
              You can terminate your account at any time by following the steps
              here. Check our Privacy Policy to see what happens when you
              terminate your account.
            </p>
          </li>
          <li>
            <h4 className="mt-3 font-bold">Payments and Refunds</h4>
            <p className="mt-2"></p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Terms;
