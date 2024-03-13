import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css'
const Featured = () => {
    return (
        <div className="featured-image bg-fixed  text-white pt-8 my-20">

            <SectionTitle subHeading={'Check it out'} heading={'Featured Item'}></SectionTitle>
            <div className="md:flex justify-center items-center py-20 pt-12 pb-24">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 12 2023</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse est suscipit perspiciatis nostrum et, excepturi corporis ab temporibus non vel accusamus mollitia soluta fuga aliquam fugit! Sint ex cum, exercitationem dolorem ratione assumenda, qui impedit commodi tempore expedita suscipit reiciendis numquam, consectetur optio ipsum earum error consequatur officiis. Modi, error.</p>
                    <button className="btn btn-outline border-b-4 border-0 border-black text-white">Default</button>

                </div>

            </div>

        </div>
    );
};

export default Featured;