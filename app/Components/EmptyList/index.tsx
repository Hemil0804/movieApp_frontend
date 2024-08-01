import Link from "next/link";


export default function EmptyState() {
  return (
    <>
    <div className="center-content">
        <div className="empty-state-wrapper">
            <h2 className="mb-40">Your movie list is empty</h2>
            <Link href="/new-movie" className="common-btn">Add a new movie</Link>
        </div>
    </div>
    </>
  );
}
