import { Show } from "@/lib/site";

/**
 * Tour dates in the template's two-column row layout: date on the left,
 * venue and support on the right, separated by the `.break` rule.
 */
export default function ShowList({ shows }: { shows: Show[] }) {
  if (shows.length === 0) {
    return (
      <>
        <h3>No Upcoming Shows</h3>
        <hr className="break" />
      </>
    );
  }

  return (
    <>
      {shows.map((show) => (
        <div key={`${show.date}-${show.venue}`}>
          <div className="row">
            <div className="col-5 col-12-medium">
              <h4>{show.date}</h4>
            </div>
            <div className="col-7 col-12-medium align-right">
              <h4>
                {show.ticketUrl ? (
                  <a href={show.ticketUrl} target="_blank" rel="noreferrer">
                    {show.venue}
                  </a>
                ) : (
                  show.venue
                )}
              </h4>
              <p>{show.location}</p>
              {show.support?.map((act) => <h6 key={act}>{act}</h6>)}
            </div>
          </div>
          <hr className="break" />
        </div>
      ))}
    </>
  );
}
