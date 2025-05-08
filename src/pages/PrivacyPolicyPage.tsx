import Footer from "../components/layout/Footer";
import MainNav from "../components/layout/MainNav"

export default function PrivacyPolicyPage() {
    return (
      <div>
      <MainNav/>
      <div className="bg-white text-gray-800 px-6 py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#1A2F80]">
          Privacy Policy
        </h1>
  
        <p className="text-gray-600 mb-6 text-sm text-center">
          Last updated: {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
  
        <div className="space-y-8 text-base leading-relaxed text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              1. Introduction
            </h2>
            <p>
              Welcome to our website. This Privacy Policy outlines how we collect,
              use, and protect your personal information when you visit our site
              or use our services.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              2. Information We Collect
            </h2>
            <p>
              We may collect personal information you provide directly to us,
              including your name, email address, phone number, and any other
              information you choose to provide.
            </p>
            <p className="mt-2">
              We also automatically collect certain data, such as your IP
              address, browser type, and pages visited, using cookies and
              analytics tools.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and improve our services</li>
              <li>To respond to your inquiries and support needs</li>
              <li>To send updates, newsletters, and promotional content</li>
              <li>To monitor website performance and usage patterns</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              4. Sharing Your Information
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to others.
              We may share your data with trusted partners who assist in
              operating our website, as long as they agree to keep this
              information confidential.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              5. Your Choices
            </h2>
            <p>
              You can opt out of receiving promotional emails from us by
              following the unsubscribe instructions in our emails. You may also
              disable cookies in your browser settings.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              6. Data Security
            </h2>
            <p>
              We implement a variety of security measures to protect your
              personal information. However, no method of transmission over the
              Internet is 100% secure.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact
              us at:{" "}
              <a
                href="mailto:your@email.com"
                className="text-blue-600 hover:underline"
              >
                your@email.com
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer/>
      </div>
    );
  }
  