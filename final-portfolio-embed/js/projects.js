// Projects

const projects = [
    {
        name: 'NEXUS DATA CORE',
        type: 'SYSTEM DESIGN',
        pos: 'start',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3' 
    },
    {
        name: 'THE AUTONOMOUS ANALYST',
        type: 'AI RESEARCH',
        pos: 'mid',
        image: 'https://images.unsplash.com/reserve/aOcWqRTfQ12uwr3wWevA_14401305508_804b300054_o.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2952&q=80' 
    },
    {
        name: 'ENTERPRISE ERP MODULES',
        type: 'BACKEND',
        pos: 'end',
        image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3'
    },
    {
        name: 'WASM RAG EXECUTION',
        type: 'LAB EXP 4099',
        pos: 'mid',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564&ixlib=rb-4.0.3' 
    },
    {
        name: 'DETERMINISTIC ROUTERS',
        type: 'OPEN SOURCE',
        pos: 'start',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3' 
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
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2668&ixlib=rb-4.0.3' 
    },
    {
        title: 'ILLUSION OF THE 10X ENGINEER',
        time: '5 MIN',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3' 
    },
    {
        title: 'MICROSERVICES TO MODULITHS',
        time: '12 MIN',
        image: 'https://images.unsplash.com/photo-1454117096348-e4abbeba002c?auto=format&fit=crop&q=80&w=2602&ixlib=rb-4.0.3' 
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

        document.getElementById('blog').appendChild(blogPostSection)

    })
}



export {
    createProjects,
    createBlogposts
}