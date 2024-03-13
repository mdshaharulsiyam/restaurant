import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const navigate = useNavigate()

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.url)
                    .then(result => {
                        //save user data 
                        const saveUser = { name: data.name, email: data.email };

                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })


                    })
                    .then(error => {
                        console.log(error);
                    })
            })
    }

    return (
        <>
            <Helmet>
                <title>Restaurant | Register</title>
            </Helmet>
            <div>
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col md:flex-row-reverse">
                        <div className="text-center md:w-1/2 lg:text-left">
                            <h1 className="text-5xl font-bold">Register!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>
                        <div className="card  md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="name" {...register("name", { required: true })} name='name' placeholder="name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-600">This field is required</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" {...register("url", { required: true })} name='url' placeholder="photo url" className="input input-bordered" />
                                    {errors.url && <span className="text-red-600">Photo URL is required</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">This field is required</span>}

                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register("password", {
                                        required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} name='password' placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                    {errors.password?.type === 'minLength' && <span className="text-red-600">At least 6 characters required</span>}
                                    {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have 1 Uppercase 1 lowercase and 1 special Character</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" {...register("confirm")} name='confirm' placeholder="confirm password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <p>Already Have an Acocunt? <Link to='/login'><span className='text-blue-600'>Login</span></Link></p>

                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value={'Register'} />
                                </div>
                            </form>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;