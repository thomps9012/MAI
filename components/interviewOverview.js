import Link from "next/link";
import titleCase from "../utils/titleCase";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const limit = 3;
export default function InterviewOverviews({ data, type }) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const useInfiniteScroll = (data, limit, page) => {
    const ending = limit * page + 1;
    return data.slice(0, ending);
  };
  const load_more = () => {
    setPage(page + 1);
    if (elements.length === data.length) {
      setHasMore(false);
    }
  };
  const elements = useInfiniteScroll(data, limit, page);
  console.log("data slice", elements);
  return (
    <InfiniteScroll
      dataLength={elements.length}
      hasMore={hasMore}
      next={load_more}
      loader={
        <a className="load-more-results" onClick={load_more}>
          Show More {titleCase(type.split("_").join(" "))}s
        </a>
      }
      endMessage={<p>No More {titleCase(type.split("_").join(" "))} Records</p>}
    >
      <div className={type + "-interview-records"} style={{ overflow: "auto" }}>
        {elements.map((element) => {
          const { _id, PID, date, agency, client_name, adult } = element;
          return (
            <article className="interview_card" key={_id}>
              <Link href={`/admin/interview_detail/${type}/${_id}`}>
                <a>
                  <h3>
                    {PID} {titleCase(type.split("_").join(" "))}
                  </h3>
                  <p>{client_name}</p>
                  <p>{adult ? "Adult" : "Youth"}</p>
                  <p>
                    Conducted by {agency} on {date}
                  </p>
                </a>
              </Link>
              <hr />
            </article>
          );
        })}
        <br />
      </div>
    </InfiniteScroll>
  );
}
