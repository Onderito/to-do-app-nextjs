import ToDoApp from "./todo/ToDoApp";

export default function Home() {
  return (
    <div>
      <section className="container mx-auto px-2 py-16 xl:py-24 sm:px-8 md:px-12 lg:px-16 xl:px-16 2xl:px-24">
        <ToDoApp />
      </section>
    </div>
  );
}
