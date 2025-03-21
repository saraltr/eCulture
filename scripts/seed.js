const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {

    // create test profiles
    const profile = await prisma.profile.create({
      data: {
        username: 'flora22',
      },
    });

    console.log('User profile created successfully:', profile);


    // create events
    const event = await prisma.event.createMany({
        data: [
            {
                name: 'Spring Jazz Festival',
                description: 'The Spring Jazz Festival is an annual celebration of jazz music featuring performances by renowned artists, local talents, and emerging musicians. Enjoy a weekend filled with soulful melodies, improvisation, and rhythmic beats in the heart of Bastille.',
                location: 'Casselberry',
                startDate: new Date('2024-01-15'),
                endDate: new Date(),
                category: ['Music', 'Festival'],
                image: '/events/event1.jpg',
                likes: 40
            },
            {
                name: 'Abstract Realities Exhibition',
                description: 'Immerse yourself in the world of abstract art with our exhibition, "Abstract Realities." Explore a diverse collection of paintings, sculptures, and multimedia installations that challenge perceptions and emotions. Witness the fusion of colors, shapes, and textures that blur the lines between reality and imagination',
                location: 'Paris',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-04-15'),
                category: ['Art', 'Exhibition',],
                image: '/events/event2.jpg',
                likes: 50
            },

            {
                name: 'Artisan Craft Fair:',
                description: 'Discover the artistry and skill behind every handmade creation at our Artisan Craft Fair, "Craftsmanship Unveiled." Browse through stalls showcasing exquisite pottery, textiles, jewelry, woodworking, and more, crafted by local artisans. Meet the makers, learn about their techniques, and take home unique treasures that celebrate traditional craftsmanship',
                location: 'Lyon',
                startDate: new Date('2024-01-15'),
                endDate: new Date('2024-01-17'),
                category: ["Art", "Crafts", "Community"],
                image: '/events/event3.jpg',
                likes: 32
            },
            {
                name: 'Tech Innovations Expo',
                description: 'Explore the latest in technology at the Tech Innovations Expo. Featuring cutting-edge gadgets, interactive demos, and expert talks, this event is a must-visit for tech enthusiasts and industry professionals.',
                location: 'San Francisco',
                startDate: new Date('2024-08-9'),
                endDate: new Date('2024-08-10'),
                category: ['Technology', 'Science', 'Business'],
                image: '/events/event2.jpg',
                likes: 55
            },
            {
                name: 'Charity Gala Night',
                description: 'The Charity Gala Night is an elegant evening dedicated to raising funds for important causes. Enjoy a night of fine dining, entertainment, and auctions to support charities that make a difference.',
                location: 'Miami',
                startDate: new Date('2024-06-25'),
                endDate: new Date('2024-06-25'),
                category: ['Charity', 'Business', 'Celebration'],
                image: '/events/event6.jpg',
                likes: 45
            },
            {
                name: 'Outdoor Adventure Workshop',
                description: 'Learn essential outdoor skills and survival techniques at the Outdoor Adventure Workshop. This event includes hands-on training, expert guidance, and exciting activities for adventure enthusiasts.',
                location: 'Denver',
                startDate: new Date('2024-07-30'),
                endDate: new Date('2024-08-30'),
                category: ['Fitness', 'Education', 'Adventure'],
                image: '/events/event7.jpg',
                likes: 30
            },
            {
        name: 'Film Festival Extravaganza',
        description: 'The Film Festival Extravaganza features screenings of independent films, panel discussions with filmmakers, and networking opportunities. Celebrate the art of cinema with fellow film enthusiasts.',
        location: 'Seattle',
        startDate: new Date('2024-08-15'),
        endDate: new Date(),
        category: ['Film', 'Art', 'Entertainment'],
        image: '/events/event8.jpg',
        likes: 70
    },
    {
        name: 'Virtual Reality Experience',
        description: 'Dive into the world of virtual reality at the Virtual Reality Experience event. Try out the latest VR technology, participate in immersive experiences, and learn about the future of virtual environments.',
        location: 'Austin',
        startDate: new Date('2024-09-10'),
        endDate: new Date(),
        category: ['Virtual', 'Technology', 'Entertainment'],
        image: '/events/event9.jpg',
        likes: 65
    }
        ]
    })

    console.log('Events created successfully:', event);

    // create comments for events
    const comments = await prisma.comment.create({
        data: 
        {
            content: "Attended this amazing concert last night. The energy was incredible!",
            event: {
                connect: {
                    id: 1
                }
            },
            profile: {
                connect: {
                    id: profile.id
                }
            },
        }
        });

        console.log('Comments created successfully:', comments);

    // adds posts from profile username
    const addPosts = await prisma.profile.update({
        where: {
            username: profile.username,
            },
        data: {
            posts: {
                create: [
                {
                    image: 'post-image-1',
                    description: 'spring jazz festival night',
                    createdAt: new Date(),
                    likes: 25
                },
                {
                    image: 'post-image-2',
                    description: 'Inspiring work at contemporary art exhibition',
                    createdAt: new Date(),
                    likes: 60
                }]}
            }
        });
        console.log('Posts created successfully:', addPosts);

        // create new user and posts associated
        const userAndPosts = await prisma.profile.create({
            data: {
                username: 'stella88',
                posts: {
                    create: [
                    {
                        image: 'post-image-1',
                        description: 'The performances were amazing, loved every moment of it!',
                        createdAt: new Date(),
                        likes: 15
                    },
                    {
                        image: 'post-image-2',
                        description: 'Great event, had a wonderful time!',
                        createdAt: new Date(),
                        likes: 35
                    }
                    ]
                }
            }
        });

        console.log('Posts created successfully:', userAndPosts);


        // create registration for event
        const registrations = await prisma.registration.create({
            data: {
                event: {
                    connect: {
                        id: 1
                    }
                    },
                    profile: {
                    connect: {
                        id: profile.id
                    }
                    },
                },
            });    
            
            console.log('Registrations created successfully:', registrations);

    console.log('Seed data created successfully');
    } catch (error) {
    console.error('Error seeding data:', error);
    } finally {
    await prisma.$disconnect();
    }
}

seed();