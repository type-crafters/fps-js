export default function ChangeBinding() {
    return (
        <div className="flex flex-1 gap-1 text-white text-2xl font-medium">
            <div className="flex justify-center items-center flex-2 rounded-l bg-dark-75 p-2">
                <p className="uppercase text-">{"move forward"}</p>
            </div>
            <button className="flex justify-center items-center flex-1 rounded-r bg-dark-75 p-2">
                <img src="/Icons/1.1/Dark/ScrollWheelDown.svg" alt="KeyW"  className="h-10"/>
            </button>
        </div>
    );
}