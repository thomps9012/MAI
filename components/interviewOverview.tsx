import Link from "next/link";
import titleCase from "../utils/titleCase";
import { Waypoint } from "react-waypoint";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const limit = 3;
export default function InterviewOverviews({
  data,
  type,
}: {
  data: any;
  type: string;
}) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const useInfiniteScroll = (data: any, limit: number, page: number) => {
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
      loader={<p>Loading ...</p>}
    >
      <div className={type + "-interview-records"}>
        {elements.map((element: any) => {
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
      </div>
    </InfiniteScroll>
  );
}
