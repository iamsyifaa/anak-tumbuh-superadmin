function MainBreadcrumb({ pageName }: { pageName: string }) {
  return (
    <div className="pt-16 lg:pl-72">
      <div className="px-4 pt-4 text-sm text-gray-400 md:px-8 md:pt-5 lg:px-10">
        Home / <span className="text-gray-600">{pageName}</span>
      </div>
    </div>
  );
}

export default MainBreadcrumb;
