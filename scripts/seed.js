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