import React from "react";
import Head from "next/head";

const Terms = () => {
  return (
    <div>
      <Head>
        <title>Terms of Use || Nubery</title>
      </Head>
      <h3>Terms of Use</h3>
      <div>
        <p>These Terms of Use ("Terms") were last updated on Nov. 10, 2022.</p>
        <p className="text-bold">
          If you live in the United States or Canada, by agreeing to these
          Terms, you agree to resolve disputes with Nubery through binding
          arbitration (with very limited exceptions, not in court), and you
          waive certain rights to participate in class actions, as detailed in
          the Dispute Resolution section.
        </p>
      </div>

      <div>
        <ol>
          <li>
            <h4>Accounts</h4>
            <p>
              You need an account for most of the activities on the Nubery
              platform. Both the students and the instructors most be about 18
              years old to create an account on Nubery or use any services on
              the platform. If you are youngr than 18 years the consent of your
              parent or guadian is required to create and choose contents
              appropriate for you.
            </p>
            <p>
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
            <p>
              You can terminate your account at any time by following the steps
              here. Check our Privacy Policy to see what happens when you
              terminate your account.
            </p>
          </li>
          <li>
            <h4>Payments and Refunds</h4>
            <p></p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Terms;
