import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function BasePage() {
  const user_data = useSelector((state: any) => state.user);
  const open_caches = async () => {
    await caches.open("user");
    await caches.open("gift_cards");
    const interview_cache = await caches.open("interviews");
    interview_cache.put("/all", await fetch("/api/interviews/all"));
    interview_cache.put("/baselines", await fetch("/api/interviews/baselines"));
    interview_cache.put(
      "/follow_ups",
      await fetch("/api/interviews/follow_ups")
    );
    interview_cache.put(
      "/testing_only",
      await fetch("/api/interviews/testing_only")
    );
    const client_cache = await caches.open("clients");
    client_cache.put(
      "/count_records",
      await fetch("/api/client/count_records")
    );
    const answer_cache = await caches.open("answers");
    answer_cache.put("/all", await fetch("/api/answers/all"));
    answer_cache.put(
      "/testing_agencies",
      await fetch("/api/answers/testing_agencies")
    );
    const question_cache = await caches.open("questions");
    question_cache.put("/all", await fetch("/api/questions/all"));
    question_cache.put(
      "/agnostic_questions",
      await fetch("/api/questions/agnostic_questions")
    );
    question_cache.put(
      "/drug_behavior",
      await fetch("/api/questions/drug_behavior")
    );
    question_cache.put(
      "/gender_options",
      await fetch("/api/questions/gender_options")
    );
    question_cache.put("/adult/all", await fetch("/api/questions/adult/all"));
    question_cache.put(
      "/adult/demographics",
      await fetch("/api/questions/adult/demographics")
    );
    question_cache.put(
      "/adult/risk_attitudes",
      await fetch("/api/questions/adult/risk_attitudes")
    );
    question_cache.put(
      "/adult/sexual_behavior",
      await fetch("/api/questions/adult/sexual_behavior")
    );
    question_cache.put("/youth/all", await fetch("/api/questions/youth/all"));
    question_cache.put(
      "/youth/demographics",
      await fetch("/api/questions/youth/demographics")
    );
    question_cache.put(
      "/youth/risk_attitudes",
      await fetch("/api/questions/youth/risk_attitudes")
    );
    question_cache.put(
      "/youth/sexual_behavior",
      await fetch("/api/questions/youth/sexual_behavior")
    );
  };
  useEffect(() => {
    open_caches();
  }, []);
  return (
    <main className="landing">
      <Link href="/interview">
        <a className="landing-link" onClick={() => sessionStorage.clear()}>
          Begin New Interview
        </a>
      </Link>
      {user_data.user?.admin && (
        <>
          <Link href="/gift_card/records">
            <a className="landing-link">Disperse Gift Card</a>
          </Link>
          <Link href="/admin/interviews">
            <a className="landing-link">Review Interviews</a>
          </Link>
          <Link href="/admin/clients">
            <a className="landing-link">Review Clients</a>
          </Link>
        </>
      )}
    </main>
  );
}
