import { welcomeContent } from "../../constants/home";

export default function WelcomeSection() {
  return (
    <section className="py-10 px-4 text-center bg-gray-50">
      <h2 className="text-2xl md:text-4xl font-bold text-green-700 mb-4">
        {welcomeContent.title}
      </h2>
      <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
        {welcomeContent.body}
      </p>
    </section>
  );
}
