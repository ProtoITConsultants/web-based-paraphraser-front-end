import { useOutletContext } from "react-router-dom";
import { SubHeader } from "../components/common/SubHeader";

export const TermOfService = () => {
  const { darkMode, setDarkMode } = useOutletContext();

  return (
    <div
      className={darkMode ? "bg-[#101214] text-white pt-18" : "bg-white pt-18 text-black"}
    >
      <SubHeader darkMode={darkMode} title="Terms of Service" />
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
          By using Paraphraser, you agree to the following terms and conditions.
          Please read them carefully.
        </p>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            License to Use:
          </strong>
          <br />
          We grant you a non-exclusive, non-transferable license to use
          Paraphraser for personal, educational, or professional purposes,
          subject to the terms outlined in this agreement.
        </p>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Usage Restrictions:
          </strong>
        </p>
        <ol className="list-decimal pl-6 text-[16px] leading-[160%]">
          <li className={darkMode ? "text-white" : "text-black"}>
            Use Paraphraser for illegal activities.
          </li>
          <li className={darkMode ? "text-white" : "text-black"}>
            Distribute or resell access to the service without permission.
          </li>
          <li className={darkMode ? "text-white" : "text-black"}>
            Exploit the service in a way that could harm its functionality or
            disrupt other users.
          </li>
        </ol>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Payment Terms:
          </strong>
          <br />
          Paraphraser offers both free services but will offer paid services in
          the future based on any feature additions. You may incur charges based
          on usage, as described in our pricing structure. We reserve the right
          to adjust pricing as necessary.
        </p>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Termination:
          </strong>
          <br />
          We may suspend or terminate your access to the service if you violate
          these terms.
        </p>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Limitation of Liability:
          </strong>
          <br />
          To the extent permitted by law, Paraphraser is not liable for any
          indirect, incidental, or consequential damages arising from your use
          of the app.
        </p>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Governing Law:
          </strong>
          <br />
          These terms will be governed by and construed in accordance with the
          laws of the Islamic Republic of Pakistan.
        </p>

        <p className="text-[16px] leading-[160%]">
          <strong
            className={`font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Changes to Terms:
          </strong>
          <br />
          We may revise these Terms of Service from time to time. By continuing
          to use the service, you agree to the updated terms.
        </p>
      </div>
    </div>
  );
};
