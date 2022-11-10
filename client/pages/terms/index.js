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
        <p className="text-center italic">
          These Terms of Use ("Terms") were last updated on Nov. 10, 2022.
        </p>
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
            <p className="mt-2">
              {" "}
              The pricing of the contents on nubery depends on the negiotiation
              with the instrutor and the promotion that is active at time of
              purchase.
            </p>
            <p className="mt-2">
              You agree to pay the fees for content that you purchase, and you
              authorize us to charge your debit or credit card or process other
              means of payment (such as Stripe, apple pay, direct debit, or
              mobile wallet) for those fees. Nubery works with payment service
              providers to offer you the most convenient payment methods in your
              country and to keep your payment information secure. We may update
              your payment methods using information provided by our payment
              service providers.
            </p>
            <h5 className="mt-2 font-semibold">Refunds</h5>
            <p className="mt-2">
              If the content you purchased is not what you were expecting, you
              can request, within 30 days of your purchase of the content, that
              Nubery apply a refund to your account.
            </p>
            <p className="mt-2">
              If we decide to issue refund credits to your account, they will be
              automatically applied towards your next content purchase on our
              website
            </p>
          </li>
          <li>
            <h4>Content Enrollment and Lifetime Access</h4>
            <p className="mt-2">
              We generally give a lifetime access license to our students when
              they enroll in a course. However, we reserve the
              right to revoke any license to access at any
              point in time in the event where we decide or are obligated to
              disable access to the course due to legal or policy reasons.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Terms;
