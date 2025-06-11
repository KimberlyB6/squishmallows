import '../css/Home-Gallery.css';

const Gallery = (props) => {
    return (
        <section className="Gallery">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <img src={props.img}/>
        </section>
    );
};

export default Gallery;