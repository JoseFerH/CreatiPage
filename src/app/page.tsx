import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Portfolio } from "@/components/sections/portfolio";
import { Process } from "@/components/sections/process";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";
import { QuizSection } from "@/components/sections/quiz-section";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Portfolio />
      <Process />
      <Contact />
      <BlogPreview />
      <QuizSection />
    </>
  );
}
