from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer


OUT_DIR = Path("output/pdf")
OUT_DIR.mkdir(parents=True, exist_ok=True)
OUT_FILE = OUT_DIR / "Web_Development_Internship_Project_Documentation.pdf"

AUTHOR = "ALOK KUMAR JANGHEL"
HEADER_LEFT = "Web Development Internship"
HEADER_RIGHT = "MSc.IT 3rd Sem"


def draw_page(canvas, doc):
    width, height = letter
    canvas.saveState()

    canvas.setStrokeColor(colors.black)
    canvas.setLineWidth(3.5)
    canvas.rect(30, 20, width - 60, height - 45, stroke=1, fill=0)
    canvas.setLineWidth(1.1)
    canvas.rect(35, 25, width - 70, height - 55, stroke=1, fill=0)

    canvas.setFont("Times-Roman", 13)
    canvas.drawString(95, height - 53, HEADER_LEFT)
    canvas.drawRightString(width - 95, height - 53, HEADER_RIGHT)

    page = canvas.getPageNumber()
    canvas.setFont("Times-Roman", 11.5)
    canvas.drawRightString(width - 86, 45, AUTHOR)
    canvas.setFillColor(colors.HexColor("#C9504D"))
    canvas.rect(width - 78, 32, 30, 28, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Times-Bold", 12)
    canvas.drawCentredString(width - 63, 42, str(page))

    canvas.restoreState()


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="MajorTitle",
        parent=styles["Title"],
        fontName="Times-Bold",
        fontSize=18,
        leading=22,
        alignment=TA_CENTER,
        spaceAfter=32,
        textTransform="uppercase",
    )
)
styles.add(
    ParagraphStyle(
        name="SectionTitle",
        parent=styles["Heading1"],
        fontName="Times-Bold",
        fontSize=15,
        leading=18,
        alignment=TA_LEFT,
        spaceBefore=8,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyReport",
        parent=styles["BodyText"],
        fontName="Times-Roman",
        fontSize=11.4,
        leading=15.8,
        firstLineIndent=36,
        alignment=TA_LEFT,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyNoIndent",
        parent=styles["BodyReport"],
        firstLineIndent=0,
    )
)


company_text = [
    "Place Mantra is a technology and education focused organization that supports students through structured internship programs, practical training, and project based learning. Its internship model gives learners a chance to apply web development concepts in realistic tasks instead of keeping the learning limited to theory.",
    "The organization encourages interns to understand a complete development cycle: requirement study, interface design, coding, testing, documentation, deployment planning, and presentation. This approach helps students build confidence in independent problem solving while also learning professional communication.",
    "During the internship, the emphasis was on modern web development using React, Vite, JavaScript, CSS, APIs, browser storage, and real time communication. The four projects documented in this report demonstrate different categories of front end and full stack development.",
]

internship_objectives = [
    "The primary objective of the internship was to strengthen practical knowledge of web application development. Each task required clear planning, reusable code structure, responsive design, and testing from the perspective of a real user.",
    "The work also focused on learning how external services and browser capabilities are connected with web applications. The projects use APIs, local storage, Chrome extension APIs, WebSocket based communication, and component based React architecture.",
    "Another important objective was documentation. A professional project report must explain not only what was built, but also why it was built, how it works, which files are responsible for important behavior, and how the project can be tested or improved.",
]

projects = [
    {
        "title": "MOVIE SEARCH APP",
        "name": "Movie House - Movie Search App",
        "stack": "React 19.2.6, Vite 8.0.12, React Icons, OMDB API, CSS3, localStorage",
        "files": "MovieApp.jsx, SearchBar.jsx, MovieCard.jsx, MovieModal.jsx, FavoritesList.jsx, api.js, constants.js",
        "features": [
            "Search movies by title using the OMDB API and display results in a responsive grid.",
            "Open a detail modal with poster, year, rating, runtime, genre, plot, director, cast, IMDb rating, production, and awards.",
            "Save and remove favorite movies using browser localStorage with the key movieFavorites.",
            "Handle loading, empty search, no result, and API failure states with user friendly messages.",
        ],
        "pages": [
            ("Project Introduction", "The Movie Search App is a React based web application created to help users discover films and save preferred titles. It demonstrates practical API integration, asynchronous data loading, state management, component communication, and persistent client side storage. The application is useful because movie search is a familiar real world workflow where the user expects fast feedback, clear information, and a simple method to keep favorite records."),
            ("Problem Statement", "Users often need a simple interface to search for movie information without visiting multiple sites. The project solves this by connecting a search interface to the OMDB database, showing compact result cards, and providing a detailed view for deeper information. The problem also includes maintaining a personal favorite list that remains available after the browser is closed."),
            ("Functional Requirements", "The system must accept a movie title, validate that the input is not empty, call the movie search endpoint, and display matching records. It must allow a user to select any movie card, fetch full details by IMDb ID, and present those details in a modal. The application must also support adding and removing favorites from both card and modal views."),
            ("Technology Stack", "React provides the component structure, Vite provides the development server and optimized build system, React Icons provides consistent interface icons, and CSS3 controls the visual layout. The OMDB API supplies search and detail data, while localStorage acts as a small persistence layer for favorites."),
            ("Architecture", "The main container MovieApp.jsx controls search query, results, loading, errors, selected movie, active tab, and favorites. The API logic is kept in api.js so that fetch calls and storage operations are separated from presentation components. This creates a cleaner structure and makes the code easier to test and maintain."),
            ("Component Design", "SearchBar handles user input and search triggering. MovieCard displays poster, title, and favorite action. MovieModal loads full movie details when a card is selected. FavoritesList displays saved movies separately from search results. This division follows the single responsibility principle in a simple and understandable way."),
            ("API Handling", "The searchMovies function sends a request using the s parameter and type movie, while getMovieDetails sends a request using the IMDb ID and plot full. Both functions handle OMDB false responses and network failures. This makes the user interface stable even when no movie is found or an external request fails."),
            ("Data Persistence", "Favorites are saved as a JSON array in localStorage. The helper functions getFavorites, saveFavorite, removeFavorite, and isFavorite centralize all persistence behavior. The storage event listener keeps the visible favorite list synchronized if storage changes in another browser tab."),
            ("Testing and Quality", "Testing should include empty search input, valid movie title, invalid movie title, slow network, detail modal opening, favorite save, favorite remove, and browser refresh. Quality also depends on responsive grid behavior, accessible alternative text for posters, readable error states, and clean separation between data logic and user interface."),
            ("Outcome", "The final Movie Search App demonstrates a complete front end workflow: input, validation, API communication, result rendering, modal detail loading, and persistent favorite management. It is suitable for portfolio presentation because it shows practical React usage and a real public API integration."),
        ],
    },
    {
        "title": "PERSONAL PRODUCTIVITY TRACKER",
        "name": "Personal Productivity Tracker - Chrome Extension",
        "stack": "React 19.2.6, Vite, Manifest V3, Chrome Storage API, Chrome Tabs API, service worker",
        "files": "Dashboard.jsx, SiteTracker.jsx, GoalSetter.jsx, TrendViewer.jsx, storage.js, service-worker.js, manifest.json, popup.jsx",
        "features": [
            "Track active tab time by domain through a background service worker.",
            "Store daily visits, daily statistics, goals, settings, and current session data locally.",
            "Show today activity, daily goals, and trends for 7, 30, or 90 day periods.",
            "Keep all data private with no external server or cloud sync.",
        ],
        "pages": [
            ("Project Introduction", "The Personal Productivity Tracker is a Chrome extension designed to help users understand how their browsing time is distributed across websites. It records site visits locally and presents daily and historical summaries through a React based popup interface."),
            ("Problem Statement", "Students and professionals often lose track of how much time is spent on different websites. The project addresses this by measuring active browsing sessions, storing per domain time, and giving the user a clear view of daily usage and productivity goals."),
            ("Functional Requirements", "The extension must monitor active tabs, calculate time spent, group visits by domain, store the data by date, show today statistics, allow daily goals, and provide historical trends. It should operate in the background without requiring manual time entry from the user."),
            ("Technology Stack", "The frontend uses React and Vite, while the extension layer uses Chrome Manifest V3. The background service worker uses chrome.tabs events and chrome.storage.local. This combination makes the extension lightweight, private, and suitable for local productivity tracking."),
            ("Storage Design", "The storage utility defines keys for daily goals, site visits, daily stats, settings, and current session. Data is stored by date in YYYY-MM-DD format. This design makes it easy to retrieve one day of usage or build a historical trend over several days."),
            ("Background Tracking", "The service worker keeps the last active tab and timestamp. Every few seconds, it records elapsed time for the active domain, updates total time, and refreshes the current session. It also responds to tab activation, tab updates, tab removal, startup, and popup messages."),
            ("Dashboard Design", "The popup dashboard organizes the experience into Today, Goals, and Trends sections. Today focuses on current browsing activity, Goals allows configuration of daily productive hours and break intervals, and Trends summarizes longer term behavior."),
            ("Privacy Considerations", "The extension stores information only in Chrome local storage. There is no server, no cloud sync, and no advertisement or tracking script. This privacy first model is important because browsing history and time usage can be sensitive personal information."),
            ("Testing and Quality", "Testing should include active tab switching, URL changes, browser startup, extension reload, data retrieval, goal saving, historical trend generation, and reset behavior. It should also verify that service worker events do not duplicate records or lose time during tab changes."),
            ("Outcome", "The final extension demonstrates how web technologies can be used beyond normal websites. It combines React interface development with Chrome extension APIs and background execution, creating a practical productivity tool that is private and easy to understand."),
        ],
    },
    {
        "title": "REAL TIME CHAT APP",
        "name": "Real-Time Chat Application",
        "stack": "React 19.2.6, Vite, Socket.io Client, Node.js, Express, Socket.io, CORS, CSS3",
        "files": "App.jsx, JoinForm.jsx, ChatContainer.jsx, MessageList.jsx, MessageItem.jsx, InputField.jsx, TypingIndicator.jsx, UserList.jsx, server.js",
        "features": [
            "Allow users to join named chat rooms with a username.",
            "Send and receive messages instantly through Socket.io events.",
            "Display online users, message timestamps, join/leave notifications, and typing indicators.",
            "Support multiple rooms where each room has isolated user and message events.",
        ],
        "pages": [
            ("Project Introduction", "The Real Time Chat App is a full stack web application that demonstrates live communication between multiple users. It uses React for the interface and Socket.io with an Express server for bidirectional event based communication."),
            ("Problem Statement", "Traditional request response applications require page refreshes or repeated polling to fetch new messages. A chat system needs instant updates. This project solves that requirement through WebSocket style communication where the server can push events to all users in a room."),
            ("Functional Requirements", "The app must connect to a backend server, allow a user to enter a username and room, send messages, receive messages from other users, display typing activity, and maintain a live list of users in the same room. Each room must remain isolated from other rooms."),
            ("Technology Stack", "The client uses React, Vite, and socket.io-client. The backend uses Node.js, Express, Socket.io, and CORS. Express provides the HTTP server foundation, while Socket.io handles connection, rooms, broadcasts, and realtime event delivery."),
            ("Backend Architecture", "The server creates an HTTP server and attaches Socket.io with allowed frontend origins. It stores active users by room in a rooms object. Events such as join-room, send-message, typing, stop-typing, and disconnect update the room state and broadcast messages to relevant clients."),
            ("Frontend Architecture", "App.jsx creates the socket connection, tracks connection status, stores username and room, and switches between loading, join form, and chat container states. ChatContainer manages messages, users, typing users, auto scrolling, and socket listener cleanup."),
            ("Socket Event Flow", "When a user joins a room, the client emits join-room and the server places that socket into the room. When a message is sent, the client emits send-message and the server emits receive-message to all users in that room. Typing events are sent only to other users in the room."),
            ("User Interface Design", "The interface includes a join form, chat header, message list, typing indicator, message input, and online users sidebar. System messages show joins and leaves, while normal messages show sender and timestamp. The layout supports group conversation while keeping user status visible."),
            ("Connection Handling", "The client enables reconnection attempts with delay settings. If the server is not running, the interface shows an error and a command hint. This is important because full stack projects depend on both client and server processes being active."),
            ("Testing and Quality", "Testing should include single user join, two users in one room, typing indicator, user list update, message timestamp, different rooms isolation, disconnect behavior, and server restart. It should also verify that socket listeners are removed to avoid duplicate messages."),
            ("Outcome", "The completed chat application shows a complete realtime workflow with room based messaging, online presence, and typing feedback. It is a strong practical example of full stack web development because both frontend and backend cooperate continuously."),
        ],
    },
    {
        "title": "WEATHER APP",
        "name": "Weather App",
        "stack": "React 19.2.6, Vite, CSS3, OpenWeatherMap API, custom weather icon assets",
        "files": "App.jsx, Weather.jsx, Weather.css, clear.png, cloud.png, drizzle.png, rain.png, snow.png, humidity.png, wind.png, search.png",
        "features": [
            "Search current weather by city name.",
            "Fetch temperature, location, humidity, wind speed, and weather condition from OpenWeatherMap.",
            "Map OpenWeatherMap icon codes to local visual assets.",
            "Load London by default and show alerts for empty or invalid city searches.",
        ],
        "pages": [
            ("Project Introduction", "The Weather App is a React application that provides current weather information for any searched city. It connects to the OpenWeatherMap API and displays the result through a compact, responsive, visual weather card."),
            ("Problem Statement", "Weather information is commonly needed before travel, study, work, or outdoor planning. The project provides a simple city based search experience that avoids unnecessary complexity while still showing the most important weather metrics."),
            ("Functional Requirements", "The app must accept a city name, prevent empty searches, fetch current weather data, display temperature in Celsius, show the city name, show humidity, show wind speed, and select a suitable weather icon based on the API condition code."),
            ("Technology Stack", "React manages state and rendering, Vite handles development and build workflow, CSS3 creates the visual weather panel, OpenWeatherMap provides current weather data, and local PNG assets provide condition icons for clear, cloudy, drizzle, rain, and snow conditions."),
            ("Component Design", "App.jsx simply renders the Weather component. Weather.jsx contains the main logic: input reference, weather data state, icon map, search function, API call, error handling, and startup loading of London. Keeping the app small makes the flow easy to study."),
            ("API Integration", "The search function builds the OpenWeatherMap weather endpoint with q, units metric, and appid from VITE_APP_ID. It reads response JSON, checks response.ok, maps the weather icon code, and saves only the data needed by the interface."),
            ("User Interface Design", "The interface uses a centered weather panel with a gradient background, rounded search field, search icon button, large weather icon, temperature, location, and two metric columns for humidity and wind speed. The design is simple and clear for quick reading."),
            ("Testing and Quality", "Testing should include default London load, valid city search, empty input, invalid city, missing API key, API failure, and different weather icon codes. Responsive checks should confirm that text, icons, and metric columns remain readable on smaller screens."),
            ("Outcome", "The Weather App demonstrates practical API consumption, environment variable usage, conditional rendering, asset mapping, and user friendly weather presentation. It is a clean beginner to intermediate React project with real world utility."),
        ],
    },
]


def paragraph(text, style="BodyReport"):
    return Paragraph(text, styles[style])


def title(text):
    return Paragraph(text, styles["MajorTitle"])


def section(text):
    return Paragraph(text, styles["SectionTitle"])


story = []

story.append(title("INTRODUCTION"))
story.append(section("Introduction"))
story.extend(paragraph(p) for p in [
    "Web development projects are most useful when they solve clear user problems and demonstrate reliable technical implementation. The four projects in this documentation cover movie search, personal productivity tracking, realtime chat, and weather information. Together they show a broad range of web development concepts including API integration, browser storage, realtime sockets, extension development, and responsive interface design.",
    "This documentation has been prepared in the same formal internship-report style as the provided reference PDF. It explains the purpose, requirements, tools, architecture, implementation process, testing approach, learning outcome, and future scope of each task.",
])
story.append(section("About Company"))
story.extend(paragraph(p) for p in company_text)
story.append(PageBreak())

story.append(section("1.2 About Internship"))
story.extend(paragraph(p) for p in internship_objectives)
story.append(section("Duration and Mode"))
story.extend(paragraph(p) for p in [
    "The internship was treated as a structured virtual web development program focused on hands on implementation. The work was completed through individual project development, local testing, code review, and documentation preparation.",
    "The mode of work was remote, which required independent setup of development tools, project folders, dependencies, local servers, API keys, and browser extension loading where required.",
])
story.append(section("Tasks Assigned"))
story.extend(paragraph(p) for p in [
    "The assigned project set includes four practical applications: Movie Search App, Personal Productivity Tracker, Real Time Chat App, and Weather App. Each task has a different purpose and technical challenge, making the portfolio stronger than a set of similar static pages.",
    "The projects were developed using modern JavaScript tools and React based structure. The documentation therefore focuses on both the visible features and the internal working of important source files.",
])
story.append(PageBreak())

story.append(section("Overall Scope of Work"))
story.extend(paragraph(p) for p in [
    "The overall scope includes building interactive applications that accept user input, communicate with APIs or browser services, store or exchange data, and present results in a polished interface. Each project must be understandable for an end user and maintainable for a developer.",
    "The Movie Search App focuses on public API integration and saved favorites. The Personal Productivity Tracker focuses on Chrome extension APIs and local time tracking. The Real Time Chat App focuses on full stack realtime communication. The Weather App focuses on current weather API usage and visual data display.",
])
for p in projects:
    story.append(paragraph(f"<b>{p['title']}:</b> {p['name']} uses {p['stack']}. Main files include {p['files']}.", "BodyNoIndent"))
story.append(PageBreak())

for project in projects:
    story.append(title(project["title"]))
    story.append(section(project["name"]))
    story.append(paragraph(f"The project was analyzed from its folder structure, package manifest, README documentation, and source files. The main technology stack is {project['stack']}."))
    story.append(section("Major Features"))
    for feat in project["features"]:
        story.append(paragraph(f"{feat}", "BodyNoIndent"))
    story.append(section("Important Source Files"))
    story.append(paragraph(project["files"]))
    story.append(PageBreak())

    for heading, body in project["pages"]:
        story.append(section(heading))
        story.append(paragraph(body))
        story.extend(paragraph(extra) for extra in [
            f"In this section, the implementation is considered from both a user perspective and a developer perspective. The user needs a smooth workflow, clear feedback, and predictable behavior. The developer needs readable source files, separated responsibilities, and a structure that can be maintained after the internship submission.",
            f"The project also supports important web development learning outcomes. It requires understanding of React state, event handling, component composition, styling, and testing. Because {project['name']} is a working application rather than a static design, it gives practical experience with real input and real application behavior.",
            f"During documentation, special attention was given to explaining the relationship between feature requirements and implementation files. This makes the report useful for viva, review, and future improvement because each feature can be traced back to the project structure.",
        ])
        story.append(PageBreak())

story.append(title("COMPARATIVE ANALYSIS"))
story.append(section("Project Comparison"))
story.extend(paragraph(p) for p in [
    "All four projects use React and Vite, but each one teaches a different development pattern. The Movie Search App and Weather App are API based applications. The Personal Productivity Tracker is a browser extension that depends on Chrome APIs. The Real Time Chat App is a full stack realtime application with a separate backend.",
    "The comparison shows how the same frontend foundation can be extended in multiple directions. A simple React component can become a search tool, a dashboard, a chat client, or a weather card depending on the data source and interaction model.",
    "From an internship perspective, this variety is valuable because it proves that learning was not limited to one repeated pattern. The tasks cover asynchronous fetch calls, persistent local storage, service worker tracking, Socket.io events, UI state, and responsive CSS design.",
])
story.append(PageBreak())

story.append(section("Testing Strategy"))
story.extend(paragraph(p) for p in [
    "Testing was planned around realistic user workflows. For the Movie Search App, the important checks include empty search, valid title, invalid title, API failure, modal opening, favorite saving, favorite removal, and refresh persistence. For the Weather App, the checks include default load, city search, invalid city, empty city, missing API key, and icon mapping.",
    "For the Personal Productivity Tracker, testing must include tab switching, tab update, startup tracking, storage retrieval, dashboard refresh, goal saving, and historical trend generation. For the Real Time Chat App, testing must include server connection, room joining, multi user messaging, typing indicators, online user list updates, and disconnect behavior.",
    "A good testing approach also includes responsive checks across desktop, tablet, and mobile widths where applicable. Interface elements should not overlap, important text should remain readable, and error messages should explain the problem clearly.",
])
story.append(PageBreak())

story.append(section("Deployment and Execution"))
story.extend(paragraph(p) for p in [
    "The React web applications can be run locally with npm install followed by npm run dev. Production builds are generated using npm run build and can be previewed with npm run preview. The Weather App requires an OpenWeatherMap key in VITE_APP_ID, while the Movie Search App requires OMDB configuration for production usage.",
    "The Real Time Chat App requires two running processes: the backend server in the server folder and the frontend Vite development server. The backend listens on port 3001 and the frontend connects to that server through Socket.io. The Personal Productivity Tracker requires a production build and loading of the dist folder through Chrome extension developer mode.",
    "Deployment planning must consider environment variables, server hosting, CORS configuration, and storage rules. The chat app would need persistent database storage for production message history, while the extension intentionally keeps data local for privacy.",
])
story.append(PageBreak())

story.append(section("Learning Outcomes"))
story.extend(paragraph(p) for p in [
    "The internship improved understanding of component based design, API calls, local storage, Chrome extension architecture, realtime communication, and responsive styling. It also strengthened debugging skills because each project involved different failure points such as missing API keys, server not running, browser storage permissions, or invalid user input.",
    "Another important learning outcome was the ability to document technical work clearly. Professional documentation explains the purpose of the project, the tools used, the internal architecture, the testing approach, and the future improvements. This makes the work easier to evaluate and easier to continue later.",
    "The projects also improved confidence in using command line tools, dependency installation, local development servers, browser developer tools, and structured folder organization. These skills are necessary for modern web development internships and entry level software roles.",
])
story.append(PageBreak())

story.append(section("Future Scope"))
story.extend(paragraph(p) for p in [
    "The Movie Search App can be improved with pagination, filters, user authentication, cloud based favorites, and improved accessibility. The Weather App can be expanded with a five day forecast, geolocation support, Celsius and Fahrenheit toggle, saved cities, and weather alerts.",
    "The Personal Productivity Tracker can be improved with category based productivity scoring, website blocking, break reminders, Pomodoro timer, export options, and dark mode. The Real Time Chat App can be improved with authentication, database backed message history, private messages, file sharing, and deployment to a production server.",
    "These improvements show that each task is not only a completed internship assignment but also a foundation for future learning. The current versions are suitable for demonstrating core concepts, while future versions can move closer to production grade applications.",
])
story.append(PageBreak())

story.append(title("CONCLUSION"))
story.append(section("Conclusion"))
story.extend(paragraph(p) for p in [
    "This documentation presents four completed web development tasks in a structured internship report format. The Movie Search App demonstrates API based search and local favorites. The Personal Productivity Tracker demonstrates Chrome extension development and private local analytics. The Real Time Chat App demonstrates full stack realtime communication. The Weather App demonstrates current weather API integration and visual result display.",
    "Together, these projects show practical understanding of React, Vite, JavaScript, CSS, public APIs, browser APIs, local storage, service workers, Express, and Socket.io. They also demonstrate the ability to organize source files, separate responsibilities, handle errors, and document the implementation professionally.",
    "The internship work therefore helped bridge the gap between classroom knowledge and practical software development. By completing and documenting these projects, the learner gained technical confidence, better project presentation skills, and a stronger foundation for future development tasks.",
])

doc = SimpleDocTemplate(
    str(OUT_FILE),
    pagesize=letter,
    rightMargin=88,
    leftMargin=88,
    topMargin=96,
    bottomMargin=62,
    title="Web Development Internship Project Documentation",
    author=AUTHOR,
)

doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
print(OUT_FILE)
