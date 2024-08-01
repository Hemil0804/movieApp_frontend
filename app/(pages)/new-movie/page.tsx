import AddEditMovie from "./_components/AddEditMovie";

export default function NewMovie() {

  return (
    <>
        <div className="new-movie-wrapper pt-120 pb-120">
            <div className="container">
                <div className="title-wrapper pb-120">
                    <h2>Create a new movie</h2>
                </div>
               
              <AddEditMovie />
                
         
            </div>

        </div>
    </>
  );
}