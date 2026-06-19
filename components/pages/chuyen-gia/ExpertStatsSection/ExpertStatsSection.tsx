export function ExpertStatsSection() {
  return (
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold mb-1">20+</p>
            <p className="text-primary-foreground/80">Chuyen gia</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-1">10+</p>
            <p className="text-primary-foreground/80">Nam kinh nghiem</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-1">50K+</p>
            <p className="text-primary-foreground/80">Luot tu van</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-1">4.9</p>
            <p className="text-primary-foreground/80">Danh gia</p>
          </div>
        </div>
      </div>
    </section>
  );
}
