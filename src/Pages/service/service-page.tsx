import ServiceModal from "@/components/landings/Home/ServiceModal";

export default function ServicePage() {
  const works = [
    {
      id: 1,
      title: "Upload Images",
      name:"images",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum, dolor in ultricies laoreet, ligula lectus consectetur quam, et ullamcorper neque metus vitae massa.",
      image:
        "https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-22225.jpg?t=st=1734956220~exp=1734959820~hmac=e1e49b8a7c1dfbb00ab8fb85cf8a63e369b7d206d1a7105f6b32ffd88de35334&w=1380",
      url: "/project1",
      inputType:"file"
    },
    {
      id: 2,
      title: "Upload Work Flow",
      name:"workFlow",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum, dolor in ultricies laoreet, ligula lectus consectetur quam, et ullamcorper neque metus vitae massa.",
      image:
        "https://img.freepik.com/free-vector/teem-discussing-project-kanban-board_1262-19963.jpg?ga=GA1.1.1005887430.1734415410&semt=ais_hybrid",
      url: "/project2",
      inputType:"file"
    },
    {
      id: 3,
      title: "Upload Videos",
      name:"videos",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum, dolor in ultricies laoreet, ligula lectus consectetur quam, et ullamcorper neque metus vitae massa.",
      image: "https://img.freepik.com/free-vector/video-content-creator-blogger-colorful-cartoon-character-video-editing-uploading-cutting-arrangement-video-shot-manipulation_335657-2324.jpg?ga=GA1.1.1005887430.1734415410&semt=ais_hybrid",
      url: "/project3",
      inputType:"file"
    },
    {
      id: 4,
      title: "Upload Documents",
      name:"docs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum, dolor in ultricies laoreet, ligula lectus consectetur quam, et ullamcorper neque metus vitae massa.",
      image: "https://img.freepik.com/free-vector/stock-exchange-data-concept_23-2148583922.jpg?ga=GA1.1.1005887430.1734415410&semt=ais_hybrid",
      url: "/project4",
      inputType:"file",
    },
    {
      id: 5,
      title: "Upload Audios",
      name:"audios",
      description:"Upload Your Audios. for free and open source. this will make you more famouse",
            image: "https://img.freepik.com/free-vector/cartoon-women-listening-music_74855-2359.jpg?ga=GA1.1.1005887430.1734415410&semt=ais_hybrid",
      url: "/project5",
      inputType:"file",
    },
  ];
  return (
    <div className="">
      <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        {works.map((work) => (
          <div key={work.id} className="relative shadow-md overflow-hidden">
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-60 object-cover"
            />
            {/* <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-bottom from-transparent to-[rgba(0,0,0,0.5)]"></div> */}
            <div className="p-4  space-y-2 flex flex-col gap-3">
              <h3 className="text-xl font-bold">{work.title}</h3>
              <p>{work.description}</p>
              <ServiceModal
              title="View Project"
              subtitle={work.title}
              data={work}
              onClick={(()=>{

              })}
              name={work.name}
              description=""
              inputType={work.inputType}
              />
            
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
