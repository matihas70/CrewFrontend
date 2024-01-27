import { Link, useNavigate } from "react-router-dom";

function Features() {
    const items = [
        {
            class: 'profile',
            header: "Edit profile",
            image: "profile.svg",
            description: "Edit informations, add photo",
        },
        {
            class: 'calendar',
            header: "Calendar",
            image: "calendar.svg",
            description: "Add events, share with your friends",
        },
        {
            class: 'groups',
            header: "Groups",
            image: "group.svg",
            description: "Explore your groups",
        },
        {
            class: 'albums',
            header: "Albums",
            image: "album.svg",
            description: "Add photos and create albums",
        }
    ];
    const navigate = useNavigate();
    return (
        <>
            <div id="features-grid">
                {items.map(i => (
                    <div key={i.header} className={"feature " + i.class} onClick={() => { navigate('/' + i.class) }}>
                        <div className="hover-div"></div>
                        <div className="inner-feature">
                            <h2>{i.header}</h2>
                            <img src={"icons/" + i.image} alt="" />
                            <p>{i.description}</p>
                        </div>
                    </div>

                ))}
            </div>
        </>
    );
}
export default Features;
