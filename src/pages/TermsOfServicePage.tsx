export default function TermsOfServicePage() {
    return (
      <div className="bg-white text-gray-800 px-6 py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#1A2F80]">
          Terms of Service
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
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using our website, services, or products, you agree
              to be bound by these Terms of Service and our Privacy Policy. If
              you do not agree to all the terms, you may not use our services.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              2. Modifications
            </h2>
            <p>
              We reserve the right to update or modify these Terms at any time.
              Changes will be effective immediately upon posting on this page. We
              encourage users to review this page regularly.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              3. Use of Our Services
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Do not misuse our services or attempt to disrupt them.</li>
              <li>You must not engage in any illegal or unauthorized activity.</li>
              <li>
                We reserve the right to terminate or restrict your access for
                violations.
              </li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              4. Intellectual Property
            </h2>
            <p>
              All content, logos, and designs on this website are the intellectual
              property of our company unless otherwise stated. You may not copy,
              reproduce, or distribute any materials without permission.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              5. Limitation of Liability
            </h2>
            <p>
              We are not liable for any indirect, incidental, or consequential
              damages resulting from your use of our services. All content is
              provided "as is" without warranties of any kind.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              6. Third-Party Links
            </h2>
            <p>
              Our site may contain links to third-party websites. We do not
              endorse or control these sites and are not responsible for their
              content or practices.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              7. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and interpreted in accordance with
              the laws of your local jurisdiction, without regard to conflict of
              law principles.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-[#1A2F80] mb-2">
              8. Contact Information
            </h2>
            <p>
              For questions about these Terms, please contact us at:{" "}
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
    );
  }
  