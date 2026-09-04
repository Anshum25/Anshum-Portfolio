// Projects

const projects = [
    {
        name: 'TRMS AI CHATBOT',
        type: 'RAG / FASTAPI',
        pos: 'start',
        image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&q=80&w=2370'
    },
    {
        name: 'NEXUS DATA CORE',
        type: 'SYSTEM DESIGN',
        pos: 'mid',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2370'
    },
    {
        name: 'IRISSET AI',
        type: 'WEB CRAWLING / AI',
        pos: 'end',
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=2370'
    },
    {
        name: 'AUTONOMOUS ANALYST',
        type: 'AI REASONING',
        pos: 'mid',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2370'
    },
    {
        name: 'WASM RAG',
        type: 'LAB / EXPERIMENT',
        pos: 'start',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2370'
    }
]

const createProjects = () => {
    projects.forEach(project => {
        let panel = document.createElement('div');
        panel.classList.add('project', `${project.pos}`);

        let imageContainer = document.createElement('div');
        imageContainer.className = `image__container`;

        let image = document.createElement('img');
        image.classList.add('project__image');
        image.src = project.image;
        image.alt = project.name;

        let projectDetails = document.createElement('div');
        projectDetails.classList.add('project__details');

        let projectTitle = document.createElement('p');
        projectTitle.innerText = project.name;

        let projectType = document.createElement('p');
        projectType.innerText = project.type;

        projectDetails.append(projectTitle, projectType)

        imageContainer.appendChild(image);
        panel.append(imageContainer, projectDetails);

        document.querySelector('.projects__slider').appendChild(panel);
    })

}


// Blog posts

const blogPosts = [
    {
        title: 'WHY YOUR RAG PIPELINE IS FAILING',
        time: '8 MIN',
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=2668'
    },
    {
        title: 'ARCHITECTURE BEFORE INTELLIGENCE',
        time: '6 MIN',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2370'
    },
    {
        title: 'DETERMINISTIC ROUTING IN AI APPS',
        time: '7 MIN',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2602'
    }
]

const createBlogposts = () => {
    blogPosts.forEach(post => {
        let blogPostSection = document.createElement('div');
        blogPostSection.classList.add('blog__post');

        let postDiv = document.createElement('div');
        postDiv.classList.add('post');

        let imageContainer = document.createElement('div');
        imageContainer.classList.add('post__image__container');

        let image = document.createElement('img');
        image.classList.add('blog__post__img');
        image.src = post.image;
        image.alt = post.title;

        let postDetails = document.createElement('div');
        postDetails.classList.add('post__details');

        let postTitle = document.createElement('p');
        postTitle.innerText = post.title;

        let postTime = document.createElement('p');
        postTime.innerText = post.time;

        imageContainer.appendChild(image);
        postDetails.append(postTitle, postTime);
        postDiv.append(imageContainer, postDetails)
        blogPostSection.appendChild(postDiv);

        document.getElementById('blog-fp').appendChild(blogPostSection)

    })
}



export {
    createProjects,
    createBlogposts
}