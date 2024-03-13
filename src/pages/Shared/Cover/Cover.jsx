import { Parallax } from 'react-parallax';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Cover = ({ img, title }) => {
    return (

        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div>
                <div className="hero h-[500px]" >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <SectionTitle subHeading={'Order Now'} heading={title}></SectionTitle>
                            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;