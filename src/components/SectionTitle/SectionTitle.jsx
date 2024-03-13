
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center text-lg font-serif mx-auto md:w-4/12 my-8">
            <p className="text-primary italic">--- {subHeading} ---</p>
            <h3 className="text-4xl py-2 uppercase text-white border-y-2 border-primary">{heading}</h3>
        </div>
    );
};

export default SectionTitle;