import { useOutletContext } from "react-router-dom";
import { SubHeader } from "../components/common/SubHeader";

export const Privacy = () => {
  const { darkMode, setDarkMode } = useOutletContext();

  return (
    <div
      className={darkMode ? "bg-[#101214] text-white pt-18" : "bg-white text-black pt-18"}
    >
      <SubHeader darkMode={darkMode} title="Privacy Policy" />
      <div className="md:px-10 px-5 py-6 flex flex-col gap-4">
        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Effective Date:
          </strong>{" "}
          7 August 2025
        </p>
        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Introduction:
          </strong>
          <br />
          Paraphraser respects your privacy and is committed to protecting your
          personal data. This Privacy Policy explains how we collect, use, and
          protect your information when you use our app and services.
        </p>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Information We Collect:
          </strong>
        </p>
        <ol className="list-decimal pl-6 text-[16px] leading-[160%]">
          <li className={darkMode ? "text-white" : "text-black"}>
            Personal Data: We do not collect personal data.
          </li>
          <li className={darkMode ? "text-white" : "text-black"}>
            Usage Data: We may collect anonymous data such as IP addresses,
            browser types, and user interactions to improve the app's
            functionality.
          </li>
          <li className={darkMode ? "text-white" : "text-black"}>
            Cookies: We use cookies to enhance user experience and gather
            analytics data.
          </li>
        </ol>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            How We Use Your Information:
          </strong>
        </p>
        <ul className="list-disc pl-6 text-[16px] leading-[160%]">
          <li className={darkMode ? "text-white" : "text-black"}>
            To improve the functionality and performance of Paraphraser.
          </li>
          <li className={darkMode ? "text-white" : "text-black"}>
            To respond to inquiries and provide customer support.
          </li>
          <li className={darkMode ? "text-white" : "text-black"}>
            For analytics purposes to understand app usage and improve the
            service.
          </li>
        </ul>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Data Security:
          </strong>
          <br />
          We implement reasonable security measures to protect your data from
          unauthorized access, alteration, or destruction.
        </p>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Third-Party Sharing:
          </strong>
          <br />
          We do not share your personal data with third parties unless required
          by law or to improve the service (e.g., API integrations with OpenAI
          and Google Cloud).
        </p>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Your Rights:
          </strong>
          <br />
          You have the right to access, update, or delete your personal
          information at any time. For requests or concerns, please contact us
          at{" "}
          <a href="mailto:info@protogroup.co">
            info@paraphraser.co
          </a>
          .
        </p>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Changes to This Privacy Policy:
          </strong>
          <br />
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the updated version on this page.
        </p>
      </div>
    </div>
  );
};
