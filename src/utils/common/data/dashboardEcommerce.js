// Import Images
import product1 from '../../../../public/assets/images/products/img-1.png';
import product2 from '../../../../public/assets/images/products/img-2.png';
import product3 from '../../../../public/assets/images/products/img-3.png';
import product4 from '../../../../public/assets/images/products/img-4.png';
import product5 from '../../../../public/assets/images/products/img-5.png';
import product7 from '../../../../public/assets/images/products/img-7.png';
import product8 from '../../../../public/assets/images/products/img-8.png';

import company1 from '../../../../public/assets/images/companies/img-1.png';
import company2 from '../../../../public/assets/images/companies/img-2.png';
import company3 from '../../../../public/assets/images/companies/img-3.png';
import company5 from '../../../../public/assets/images/companies/img-5.png';
import company8 from '../../../../public/assets/images/companies/img-8.png';

import Image from 'next/image';
import Link from 'next/link';
import avatar1 from '../../../../public/assets/images/users/avatar-1.jpg';
import avatar2 from '../../../../public/assets/images/users/avatar-2.jpg';
import avatar3 from '../../../../public/assets/images/users/avatar-3.jpg';
import avatar4 from '../../../../public/assets/images/users/avatar-4.jpg';
import avatar6 from '../../../../public/assets/images/users/avatar-6.jpg';

const userDummyImage = '/assets/images/users/user-dummy-img.jpg';
const teamDummyImage = '/assets/images/users/multi-user.jpg';
const edulogo = '/favicon.png';
const brandlogo = '/edusmart-Final-Logo-Final-Logo.png';

const universityHeadersWithoutAction = [
  {
    title: 'Logo - Name',
    key: 'logo',
    render: (item) => (
      <div className="d-flex align-items-center me-5">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/super-admin/university-management/single-university-profile/${item?._id}`}
            className="text-reset"
          >
            <Image
              src={item?.logo?.url ? item?.logo?.url : `${userDummyImage}`}
              alt="User"
              height={60}
              width={60}
              className="avatar-md p-1 me-3 align-middle rounded-circle"
            />
          </Link>
        </div>
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            <Link
              href={`/super-admin/university-management/single-university-profile/${item?._id}`}
              className="text-reset"
            >
              {`${item.name} `}
            </Link>
          </h5>
        </div>
      </div>
    ),
  },

  {
    title: 'Description',
    key: 'description',
    render: (item) => (
      <p className="text-wrap me-5">
        {`${item.description.split(' ').slice(0, 20).join(' ')}...`}
      </p>
    ),
  },
  { title: 'Code', key: 'code' },
  {
    title: 'Address',
    key: 'address',
    render: (item) => (
      <div className="d-flex gap-2">
        <div className="text-capitalize">
          <span className="me-2">
            {item?.address_line_1 ? item?.address_line_1 + ',' : '' || '-'}
          </span>
          <span className="me-2">
            {item?.address_line_2 ? item?.address_line_2 + ',' : '' || '-'}
          </span>
        </div>
        <div className="text-capitalize">
          <span className="me-2">
            {item?.city ? item?.city + ',' : '' || '-'}
          </span>
          <span className="me-2">
            {item?.state ? item?.state + ',' : '' || '-'}
          </span>
        </div>
        <div className="text-capitalize">
          <span className="me-2">
            {item?.zip ? item?.zip + ',' : '' || '-'}
          </span>
          <span className="me-2">{item?.country || '-'}</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Status',
    key: 'status',
    render: (item) => (
      <>
        <span
          className={`border rounded-4 px-4 py-1 fw-medium text-capitalize ${item?.status === 'active' ? 'bg-third-color text-primary' : 'bg-fourth-color text-white'}`}
        >
          {item?.status ?? '-'}
        </span>
      </>
    ),
  },
];

const agentsHeadersWithoutAction = [
  {
    title: 'Name',
    key: 'profile_image',
    render: (item) => (
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-1">
          <Link href={``} className="text-reset">
            <Image
              src={
                item?.profile_image?.url
                  ? item?.profile_image?.url
                  : `${userDummyImage}`
              }
              alt="User"
              height={60}
              width={60}
              className="avatar-md p-1 me-3 align-middle rounded-circle"
            />
          </Link>
        </div>
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            <Link href={``} className="text-reset">
              {`${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`}
            </Link>
          </h5>
        </div>
      </div>
    ),
  },

  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  {
    title: 'Country',
    key: 'country',
    render: (item) => (
      <span className="d-flex flex-column text-capitalize">
        {item?.country ? <span>{item.country}</span> : '-'}
      </span>
    ),
  },
];
const studentsHeadersWithoutAction = [
  {
    title: 'Name',
    key: 'profile_image',
    render: (item) => (
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-1">
          <Link href={``} className="text-reset">
            <Image
              src={
                item?.profile_image?.url
                  ? item?.profile_image?.url
                  : `${userDummyImage}`
              }
              alt="User"
              height={60}
              width={60}
              className="avatar-md p-1 me-3 align-middle rounded-circle"
            />
          </Link>
        </div>
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            <Link href={``} className="text-reset">
              {`${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`}
            </Link>
          </h5>
        </div>
      </div>
    ),
  },

  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  {
    title: 'Country',
    key: 'country',
    render: (item) => (
      <span className="d-flex flex-column text-capitalize">
        {item?.country ? <span>{item.country}</span> : '-'}
      </span>
    ),
  },
];

const ecomWidgets = [
  {
    id: 1,
    cardColor: 'primary',
    label: 'Total Teams',
    badge: 'ri-arrow-right-up-line',
    badgeClass: 'success',
    percentage: '+16.24',
    counter: '559',
    link: 'Manage Teams',
    bgcolor: 'secondary',
    icon: 'ri-team-fill',
    pathName: '/admin/team-management',
    // decimals: 2,
    // prefix: '$',
    // suffix: 'k',
  },
  {
    id: 2,
    cardColor: 'secondary',
    label: 'Total Players',
    badge: 'ri-arrow-right-down-line',
    badgeClass: 'danger',
    percentage: '-3.57',
    counter: '368',
    link: 'All players',
    bgcolor: 'info',
    icon: 'ri-group-fill',
    pathName: '/admin/all-players',
    // decimals: 0,
    // prefix: '',
    // separator: ',',
    // suffix: '',
  },
  {
    id: 3,
    cardColor: 'success',
    label: 'total guardians',
    badge: 'ri-arrow-right-up-line',
    badgeClass: 'success',
    percentage: '+29.08',
    counter: '183',
    link: 'All Guardian',
    bgcolor: 'warning',
    icon: 'ri-group-fill',
    // decimals: 2,
    prefix: '',
    // suffix: 'M',
    pathName: '/admin/all-guardians',
  },
  {
    id: 4,
    cardColor: 'info',
    label: 'Total transaction',
    badgeClass: 'muted',
    percentage: '+0.00',
    counter: '165.89',
    link: '',
    bgcolor: 'primary',
    icon: 'bx bx-wallet',
    decimals: 2,
    // prefix: '$',
    suffix: 'k',
    pathName: '/admin/reports',
  },
];

const teamManagementWidgets = [
  {
    id: 1,
    label: 'Total Teams',
    counter: '10',
    bgcolor: 'info',
    icon: 'bx bxs-bookmark-alt',
  },
  {
    id: 2,
    label: 'Total Players',
    counter: '25',
    bgcolor: 'info',
    icon: 'bx bxs-group',
  },
  {
    id: 3,
    label: 'Active Players',
    counter: '55',
    bgcolor: 'success',
    icon: 'bx bxs-user-check',
  },
  {
    id: 4,
    label: 'Inactive Players',
    counter: '4',
    bgcolor: 'danger',
    icon: 'bx bxs-user-x',
  },
];
const ecommerceReports = [
  {
    id: 1,
    label: 'Total Sale',
    counter: '1025.96',
    bgcolor: 'info',
    icon: 'bx bxs-shopping-bag-alt',
    prefix: '$',
    suffix: 'k',
    decimals: '2',
    separator: ',',
  },
  {
    id: 2,
    label: 'Pending order',
    counter: '559',
    bgcolor: 'info',
    icon: 'bx bx-shopping-bag',
  },
  {
    id: 3,
    label: 'COMPLETE ORDER',
    counter: '25',
    bgcolor: 'info',
    icon: 'bx bxs-shopping-bags',
  },
  {
    id: 4,
    label: 'TOTAL ORDER',
    counter: '452',
    bgcolor: 'info',
    icon: 'bx bxs-shopping-bag',
  },
];
const managerProfileData = [
  {
    id: 1,
    label: 'Total Teams',
    counter: '10',
    bgcolor: 'info',
    icon: 'ri-team-line',
    link: 'View All',
    pathName: '/manager/teams-for-manager',
  },
  {
    id: 2,
    label: 'SEASONAL GAME',
    counter: '55',
    bgcolor: 'info',
    icon: 'ri-gamepad-line',
    link: 'View All',
    pathName: '/manager/seasonal-games-for-manager',
  },
  {
    id: 3,
    label: 'GAME SCHEDULE',
    counter: '25',
    bgcolor: 'info',
    icon: 'ri-game-line ',
    link: 'View All',
    pathName: '/manager/game-schedule-for-manager',
  },
  {
    id: 4,
    label: 'TRAINING SCHEDULE',
    counter: '4',
    bgcolor: 'info',
    icon: 'ri-text-spacing',
    link: 'View All',
    pathName: '/manager/training-schedule-for-manager',
  },
];
const trainerProfileData = [
  {
    id: 1,
    label: 'Total Teams',
    counter: '10',
    bgcolor: 'info',
    icon: 'ri-team-line',
    link: 'View All',
    pathName: '/trainer/teams-for-trainer',
  },
  {
    id: 2,
    label: 'SEASONAL GAME',
    counter: '55',
    bgcolor: 'info',
    icon: 'ri-gamepad-line',
    link: 'View All',
    pathName: '/trainer/seasonal-games-for-trainer',
  },
  {
    id: 3,
    label: 'GAME SCHEDULE',
    counter: '25',
    bgcolor: 'info',
    icon: 'ri-game-line ',
    link: 'View All',
    pathName: '/trainer/game-schedule-for-trainer',
  },
  {
    id: 4,
    label: 'TRAINING SCHEDULE',
    counter: '4',
    bgcolor: 'info',
    icon: 'ri-text-spacing',
    link: 'View All',
    pathName: '/trainer/training-schedule-for-trainer',
  },
];
const playerProfileData = [
  {
    id: 1,
    label: 'Total Team',
    counter: '10',
    bgcolor: 'info',
    icon: 'ri-group-line',
    link: 'View All',
    pathName: '/player/teams-for-player',
  },
  {
    id: 2,
    label: 'Seasonal GAMEs',
    counter: '55',
    bgcolor: 'info',
    icon: 'ri-gamepad-line',
    link: 'View All',
    pathName: '/player/seasonal-games-for-player',
  },
  {
    id: 3,
    label: 'Special Events',
    counter: '25',
    bgcolor: 'info',
    icon: 'ri-calendar-event-line',
    link: 'View All',
    pathName: '/player/special-events-for-player',
  },
  {
    id: 4,
    label: 'TOTAL Invoices',
    counter: '4',
    bgcolor: 'info',
    icon: 'ri-bill-line',
    link: 'View All',
    pathName: '/player/player-profile-for-player',
  },
];
const guardianProfileData = [
  {
    id: 1,
    label: 'PLAYERS',
    counter: '4',
    bgcolor: 'info',
    icon: 'ri-group-line',
    link: 'View All ',
    pathName: '/guardian/all-player-for-guardian',
  },
  {
    id: 2,
    label: 'Special Events',
    counter: '25',
    bgcolor: 'info',
    icon: 'ri-calendar-event-line',
    link: 'View All ',
    pathName: '/guardian/special-events-for-guardian',
  },
  {
    id: 3,
    label: 'SEASONAL GAMES',
    counter: '55',
    bgcolor: 'info',
    icon: 'ri-gamepad-line',
    link: 'View All ',
    pathName: '/guardian/seasonal-games-for-guardian',
  },
  {
    id: 4,
    label: 'Invoices',
    counter: '10',
    bgcolor: 'info',
    icon: 'ri-bill-line',
    link: 'View All ',
    pathName: '/guardian/invoices-for-guardian',
  },
];

const faqOptionsData = [
  {
    _id: 1,
    name: 'General Questions',
    ques: [
      {
        id: 1,
        q: 'What is SquadDeck?',
        d: `SquadDeck is an advanced organisational membership and team management platform that helps manage sports academies, and sports organizations, clubs, leagues, sports teams, social groups, and membership organisations perform functions including membership registration, dues payment collection, team and schedule creation, Sports events, league and tournament management, field, personnel, website content, web merch store sales, live chat, and much more.
  
  SquadDeck helps managers to run their organisation, parents and guardians to support their children, coaches to coach their players and to manage their teams, athletes to excel at sports, and everybody else to get connected with their club or team.`,
      },
      {
        id: 2,
        q: 'How long does it take to set up an account?',
        d: `Setup is fast and easy and takes about 10 minutes. You can customise your whole website to get the best performance possible, whether you're a newbie or a skilled website developer. No technical skills are required, and our support is available to help with anything you have trouble with. What have you got to lose? Let's go!`,
      },
      {
        id: 3,
        q: 'Do you have any support fees or additional charges?',
        d: `Support is always free and our experts can help with any issues you encounter from setup to deployment.`,
      },
      {
        id: 4,
        q: 'Can I upgrade my plan in the middle of subscription?',
        d: `Yes, you can change or upgrade your plan at any time you want.`,
      },
      {
        id: 5,
        q: 'What sports does SquadDeck support?',
        d: `We support all kinds of sports but each of our templates can be tailored to suit your own purposes. We've already built some basic templates for certain popular sports.`,
      },
      {
        id: 6,
        q: 'Can I get custom email address with my domain name?',
        d: `Yes, of course, and we don't charge for it. In fact, you will also get an individual website, powerful functional CMS System, responsive website, custom email and many more.`,
      },
      {
        id: 7,
        q: 'Can we download and export our data from SquadDeck?',
        d: `Yes, you can download and export most of your data like registrations, payments, staff members, coaches, trainers, etc.`,
      },
      {
        id: 8,
        q: 'What if I need custom features from SquadDeck?',
        d: `We will be more than happy to hear your requirements. After gathering all requirements from you, we will evaluate them for you immediately. If we cannot accept your request for any reason, we will let you know.`,
      },
      {
        id: 9,
        q: 'How can a player signup for our club / team / league?',
        d: `Players can sign up anytime through your website and join your club/league/team. When a player registers, admins will get a notification. Additionally, admins themselves can also add players.`,
      },
      {
        id: 10,
        q: 'Do I need any technical knowledge for using SquadDeck?',
        d: `No, you don't need any technical knowledge for using SquadDeck. What you need is just basic internet knowledge. That's it.`,
      },
    ],
  },
  {
    _id: 2,
    name: 'Pricing Questions',
    ques: [
      {
        id: 11,
        q: 'How much does SquadDeck subscription cost?',
        d: `We've got a range of pricing options depending on the features you need. If you opt for a paid account, you'll experience the benefits of reduced processing fees and more options to choose from. All the SquadDeck subscription fees include everything including support, hosting, security, and much more. Best of all, no need for expensive website experts! Manage the SquadDeck way! Please visit our pricing page to see subscription fees.`,
      },
      {
        id: 12,
        q: 'Can I cancel my subscription?',
        d: `Yes, if you want to cancel your subscription, you can do it at any time you want.`,
      },
      {
        id: 13,
        q: 'What is the difference between each plan?',
        d: `Please click here and visit the pricing page, where you will find our pricing plan side by side.`,
      },
      {
        id: 14,
        q: 'Can I upgrade my plan in the middle of the subscription?',
        d: `Yes, you can upgrade your plan at any time you want.`,
      },
      {
        id: 15,
        q: 'Any additional charges or support fees?',
        d: `Absolutely No... Our subscription fee includes everything, and we never charge for consulting or support.`,
      },
      {
        id: 16,
        q: 'Are there any long-term contracts?',
        d: `No... We don't have any long-term contracts for our users. But, if you prefer a long-term contract for favorable pricing, we will be more than happy to work with you.`,
      },
      {
        id: 17,
        q: 'How long can I use SquadDeck for free?',
        d: `SquadDeck software system is completely free, you can use it as long as you want and you can add unlimited members, coaches, and trainers. We only charge when you extend your team & players. Check our pricing plans for better understanding.`,
      },
      {
        id: 18,
        q: 'What payment modes do you support?',
        d: `We only accept Stripe for payment.`,
      },
      {
        id: 19,
        q: 'Can I get a custom website?',
        d: `Our system will provide you a complete free website, you don't need to pay for that, but if you want a custom website, we will be more than happy to fulfill your requirements. Pricing will depend on your customization. For an idea, please visit our pricing page to see subscription fees and custom website costs.`,
      },
      {
        id: 20,
        q: 'How can I get a discount?',
        d: `Actually, our system is completely FREE, you don't need to pay until you make money through our system.`,
      },
      {
        id: 21,
        q: 'Can the free account become a premium account?',
        d: `Yes, your free account will automatically become a premium account when you upgrade your account.`,
      },
    ],
  },
  {
    _id: 3,
    name: 'Registration',
    ques: [
      {
        id: 22,
        q: 'How will a kid get registered for the program?',
        d: `Parents will register their kids through your website, and mature players can also register for the program themselves.`,
      },
      {
        id: 23,
        q: 'How can I collect payments? Online or offline?',
        d: `Both options are available. You just need to select the option you want while setting up the program.`,
      },
      {
        id: 24,
        q: 'How do I create installments?',
        d: `To update the registrant payment, just find the registrant, confirm from your panel, update, and you can also print the payment slip.`,
      },
      {
        id: 25,
        q: 'How do I update a registrants payment status?',
        d: `You can update a registrant's payment status by clicking a button under payment status for every player.`,
      },
      {
        id: 26,
        q: 'Can I have invitation-based registrations?',
        d: `Yes, of course. You will get a short link to share and invite people to register.`,
      },
      {
        id: 27,
        q: 'How do I get more information from my customers?',
        d: `While you create an event or program, you can attach custom fields in the registration process, so that you get the information you want when someone registers.`,
      },
      {
        id: 28,
        q: 'Can registrants upload documents?',
        d: `Yes, registrants can upload any documents you require.`,
      },
      {
        id: 29,
        q: 'How can a player sign up for our club/league?',
        d: `Typically, players can sign up for your organization through your website, and additionally, organization admins can add players without registration.`,
      },
      {
        id: 30,
        q: 'How do I track my unpaid registrations?',
        d: `You will get notifications for your unpaid registrants and can view the full list from your panel.`,
      },
      {
        id: 31,
        q: 'How do I collect recurring payments?',
        d: `While creating an event or program, you will find the payment type option, and you can define what type of payment suits you best, cash or online.`,
      },
      {
        id: 32,
        q: 'Does "SquadDeck" support family member discounts?',
        d: `If you want to create discounts for family members or any other players, you can do it any time from the discount option.`,
      },
      {
        id: 33,
        q: 'How do I view all my registrations?',
        d: `To view all your registrations, navigate to Registration > All Registrations from your panel.`,
      },
    ],
  },
  {
    _id: 4,
    name: 'Payments',
    ques: [
      {
        id: 34,
        q: 'How can I collect payments online?',
        d: `You can collect payments in the way you want, whether cash or online. You select what suits you best.`,
      },
      {
        id: 35,
        q: 'What are the payment processing charges?',
        d: `It depends on your payment gateway and how you collect payments from your members.`,
      },
      {
        id: 36,
        q: 'How do I update a registrants payment status?',
        d: `You can update a registrant's payment status by clicking a button under payment status for every player.`,
      },
      {
        id: 37,
        q: 'What payment gateways do you support?',
        d: `We support Stripe as a payment gateway. At the end of the month, you have to pay us the subscription fee through Stripe.`,
      },
      {
        id: 38,
        q: 'What is the payment process?',
        d: `You will collect payments from your members instantly and directly to your account through your selected method. We don't have any control over that, but at the end of the month, you will get a bill from SquadDeck which you have to pay through Stripe.`,
      },
      {
        id: 39,
        q: 'Can I collect both online and offline payments?',
        d: `Yes, you can collect both online and offline payments.`,
      },
      {
        id: 40,
        q: 'How do I generate payment reports?',
        d: `Our system will generate payment reports. When you add a new member or a registrant gets registered, the system will detect everything and you will find an option to generate a payment report.`,
      },
      {
        id: 41,
        q: 'I already have a merchant account. Can I use it for payment?',
        d: `Yes, of course. You can use any method you already have.`,
      },
      {
        id: 42,
        q: 'How do I track my unpaid registrations?',
        d: `Our system will notify you of unpaid registrations, and you can contact them through our system.`,
      },
      {
        id: 43,
        q: 'If there is fraudulent activity on our payments, is SquadDeck responsible for it?',
        d: `It actually depends on your payment gateway and how you collect payments from your members. SquadDeck will not be responsible for it.`,
      },
      {
        id: 44,
        q: 'How do I collect recurring payments?',
        d: `While creating an event or program, you will find the payment type option, and you can define what type of payments suit you best, cash or online.`,
      },
    ],
  },
  {
    _id: 5,
    name: 'Scheduling',
    ques: [
      {
        id: 45,
        q: 'Can I cancel a schedule?',
        d: `Yes, you can create and cancel a schedule anytime you want. Click here to see the tutorials.`,
      },
      {
        id: 46,
        q: 'Will the team members get notified when I cancel the schedule?',
        d: `Yes, when you cancel any schedule, everyone who is related to the event will be notified through push notifications.`,
      },
      {
        id: 47,
        q: 'Can I export my schedules?',
        d: `Yes, you can export and print a hard copy of your schedule, event, members list, etc.`,
      },
      {
        id: 48,
        q: 'How do I send a message to the team members about the schedule?',
        d: `When you schedule a game/event/practice, select the option to notify team members. Then, members will be automatically notified through SMS and push notifications.`,
      },
      {
        id: 49,
        q: 'Can I sync my schedules with external calendars like Google, iCalendar?',
        d: `Yes, you can sync your schedules with external calendars.`,
      },
      {
        id: 50,
        q: 'Can I update game scores?',
        d: `Yes, you can update game scores. Click here to see the tutorials.`,
      },
      {
        id: 51,
        q: 'Can I generate tournament and league schedules?',
        d: `Yes, you can generate tournament and league schedules. Click here to see the tutorials.`,
      },
    ],
  },
  {
    _id: 6,
    name: 'Website',
    ques: [
      {
        id: 52,
        q: 'How can I activate my website?',
        d: `After registration, you will get an active website template. You will just need to add your business information.`,
      },
      {
        id: 53,
        q: 'Can I customize my website?',
        d: `Yes, you can customize everything from our template for your business.`,
      },
      {
        id: 54,
        q: 'What will be my website address?',
        d: `Your website address will be your customized address for your business.`,
      },
      {
        id: 55,
        q: 'Can I get a custom domain for my website?',
        d: `Yes, you can get a custom domain for your website from us, but not from SquadDeck. We provide domain and hosting services, as well as professional web design and development services.`,
      },
      {
        id: 56,
        q: 'Will I get help from you to build my website?',
        d: `Of course, you are always welcome.`,
      },
      {
        id: 57,
        q: 'Can I request an SSL Certificate for my domain?',
        d: `Yes, you will get an SSL Certificate for your website.`,
      },
      {
        id: 58,
        q: 'How much does it cost to make a website?',
        d: `Please check our pricing section on the Pricing page.`,
      },
      {
        id: 59,
        q: 'Can I move my website to my host?',
        d: `Yes, of course, you can move your website to your host.`,
      },
    ],
  },
  {
    _id: 7,
    name: 'Accounts & Admin',
    ques: [
      {
        id: 60,
        q: 'How do I renew my subscription?',
        d: `When it's time for your subscription to expire, you'll have renewal options available in your account, which will appear 1 week before the expiration date.`,
      },
      {
        id: 61,
        q: 'How do I add staff members?',
        d: `Please visit support.squaddeck.com for a tutorial on how to use SquadDeck.`,
      },
      {
        id: 62,
        q: 'For a staff member, can I give limited access to the application?',
        d: `There is no limit to using SquadDeck, it's completely FREE for all.`,
      },
      {
        id: 63,
        q: 'What age group is best for using SquadDeck?',
        d: `Everyone above 18+ is best for using SquadDeck. Guardians will use SquadDeck instead of children below 18.`,
      },
      {
        id: 64,
        q: 'What sports are covered?',
        d: `We cover all major sports. About 50+ sports are growing.`,
      },
      {
        id: 65,
        q: 'How is SquadDeck unique?',
        d: `SquadDeck is unique because it offers a comprehensive suite of features tailored specifically to the needs of sports organizations, clubs, and membership groups. It provides a one-stop shop for membership management, team organization, event management, website content management, and more.`,
      },
      {
        id: 66,
        q: 'How much will SquadDeck cost?',
        d: `SquadDeck is completely FREE to use, everything is free to use, you will just pay a subscription fee at the end of the month. Please visit the pricing page.`,
      },
      {
        id: 67,
        q: 'Is SquadDeck for people in Australia only?',
        d: `No, SquadDeck is a global platform that can be used by sports organizations, clubs, and membership groups around the world. It is designed to support different types of sports and allows for customization to suit the needs of different organizations.`,
      },
      {
        id: 68,
        q: 'Is SquadDeck affiliated with any sport organizations?',
        d: `While we do not offer direct services for connecting athletes with coaches or other sports programs, we do provide valuable information regarding the local sports programs in your vicinity. This information can be of great help in connecting you with the right coaches and athletes.`,
      },
      {
        id: 69,
        q: 'Does SquadDeck provide any sports information?',
        d: `Certainly not, however, we do provide valuable insights about the nearby sports initiatives in your area to help you establish connections with coaches and fellow athletes.`,
      },
      {
        id: 70,
        q: 'Is SquadDeck safe for my kid?',
        d: `SquadDeck is a secure platform designed specifically for children to create and develop their athletic profile. Hence, it is completely safe to use. This feature makes SquadDeck an ideal tool to facilitate this aspect of the young athletes' growth.`,
      },
    ],
  },
];

const supperAdminWidgetsData = [
  {
    id: 1,
    label: 'Registered UNIVERSITIES',
    counter: '4',
    bgcolor: 'info',
    icon: 'ri-school-fill',
    link: 'View all',
    pathName: '/super-admin/university-management/all-university',
  },

  {
    id: 2,
    label: 'registered agents',
    counter: '25',
    bgcolor: 'info',
    icon: 'ri-group-2-fill',
    link: 'View all',
    pathName: '/super-admin/agents',
  },
  {
    id: 3,
    label: 'registered students',
    counter: '55',
    bgcolor: 'warning',
    icon: 'ri-group-fill',
    link: 'View  all',
    pathName: '/super-admin',
  },
  {
    id: 4,
    label: 'total income',
    counter: '55',
    bgcolor: 'warning',
    icon: 'ri-wallet-3-fill',
    link: 'All Charges',
    pathName: '/super-admin',
  },
];

const orderSummary = [
  {
    id: 1,
    img: product8,
    name: 'Sweatshirt for Men (Pink)',
    price: 119.99,
    quantity: 2,
    total: 239.98,
  },
  {
    id: 2,
    img: product7,
    name: 'Noise Evolve Smartwatch',
    price: 94.99,
    quantity: 1,
    total: 94.99,
  },
  {
    id: 3,
    img: product3,
    name: '350 ml Glass Grocery Container',
    price: 24.99,
    quantity: 1,
    total: 24.99,
  },
];

const teamProfileData = [
  {
    id: 1,
    label: 'TOTAL PLAYER',
    counter: '10',
    bgcolor: 'info',
    icon: 'bx bx-user',
  },
  {
    id: 2,
    label: 'game schedule',
    counter: '55',
    bgcolor: 'info',
    icon: 'ri-gamepad-line',
  },
  {
    id: 3,
    label: 'training schedule',
    counter: '25',
    bgcolor: 'info',
    icon: 'bx bx-run',
  },
  {
    id: 4,
    label: 'total sponsors',
    counter: '4',
    bgcolor: 'info',
    icon: 'ri-exchange-dollar-line',
  },
];

const bestSellingProducts = [
  {
    id: 1,
    img: product1,
    label: 'Branded T-Shirts',
    date: '24 Apr 2021',
    price: 29.0,
    orders: 62,
    stock: 510,
    amount: 1798,
  },
  {
    id: 2,
    img: product2,
    label: 'Bentwood Chair',
    date: '19 Mar 2021',
    price: 85.2,
    orders: 35,
    amount: 2982,
  },
  {
    id: 3,
    img: product3,
    label: 'Borosil Paper Cup',
    date: '01 Mar 2021',
    price: 14.0,
    orders: 80,
    stock: 749,
    amount: 1120,
  },
  {
    id: 4,
    img: product4,
    label: 'One Seater Sofa',
    date: '11 Feb 2021',
    price: 127.5,
    orders: 56,
    amount: 7140,
  },
  {
    id: 5,
    img: product5,
    label: 'Stillbird Helmet',
    date: '17 Jan 2021',
    price: 54,
    orders: 74,
    stock: 805,
    amount: 3996,
  },
];
const formBuilderBasicWidgets = [
  {
    id: 1,
    label: 'Text',
    icon: 'ri-text',
  },
  {
    id: 2,
    label: 'Text Area',
    icon: 'ri-paragraph',
  },
  {
    id: 3,
    label: 'Drop Down',
    icon: 'ri-arrow-down-s-fill',
  },
  {
    id: 4,
    label: 'Number',
    icon: 'ri-hashtag',
  },
  {
    id: 5,
    label: 'Checkbox',
    icon: 'ri-checkbox-line',
  },
  {
    id: 6,
    label: 'Radio Button',
    icon: 'ri-checkbox-circle-line',
  },
  {
    id: 7,
    label: 'Email',
    icon: 'ri-mail-line',
  },
];
const formBuilderAdvancedWidgets = [
  {
    id: 1,
    label: 'Phone',
    icon: 'ri-phone-line',
  },
  {
    id: 2,
    label: 'Address',
    icon: 'ri-map-pin-line',
  },
  {
    id: 3,
    label: 'Date',
    icon: 'ri-calendar-line',
  },
  {
    id: 4,
    label: 'Time',
    icon: 'ri-time-line',
  },
  {
    id: 5,
    label: 'File',
    icon: 'ri-file-line',
  },
  // {
  //   id: 6,
  //   label: 'List',
  //   icon: 'ri-list-check',
  // },
  // {
  //   id: 7,
  //   label: 'Captcha',
  //   icon: 'ri-refresh-line',
  // },
];

const topSellers = [
  {
    id: 1,
    img: company1,
    label: 'iTest Factory',
    name: 'Oliver Tyler',
    product: 'Bags and Wallets',
    stock: 8547,
    amount: 541200,
    percentage: 32,
  },
  {
    id: 2,
    img: company2,
    label: 'Digitech Galaxy',
    name: 'John Roberts',
    product: 'Watches',
    stock: 895,
    amount: 75030,
    percentage: 79,
  },
  {
    id: 3,
    img: company3,
    label: 'Nesta Technologies',
    name: 'Harley Fuller',
    product: 'Bike Accessories',
    stock: 3470,
    amount: 45600,
    percentage: 90,
  },
  {
    id: 4,
    img: company8,
    label: 'Zoetic Fashion',
    name: 'James Bowen',
    product: 'Clothes',
    stock: 5488,
    amount: 29456,
    percentage: 40,
  },
  {
    id: 5,
    img: company5,
    label: 'Meta4Systems',
    name: 'Zoe Dennis',
    product: 'Furniture',
    stock: 4100,
    amount: 11260,
    percentage: 57,
  },
];

const recentOrders = [
  {
    id: 1,
    orderId: '#VZ2112',
    img: avatar1,
    name: 'Alex Smith',
    product: 'Clothes',
    amount: 109.0,
    vendor: 'Zoetic Fashion',
    status: 'Paid',
    statusClass: 'success',
    rating: 5,
    votes: '61',
  },
  {
    id: 2,
    orderId: '#VZ2111',
    img: avatar2,
    name: 'Jansh Brown',
    product: 'Kitchen Storage',
    amount: 149.0,
    vendor: 'Micro Design',
    status: 'Pending',
    statusClass: 'warning',
    rating: 4.5,
    votes: '61',
  },
  {
    id: 3,
    orderId: '#VZ2109',
    img: avatar3,
    name: 'Ayaan Bowen',
    product: 'Bike Accessories',
    amount: 215.0,
    vendor: 'Nesta Technologies',
    status: 'Paid',
    statusClass: 'success',
    rating: 4.9,
    votes: '89',
  },
  {
    id: 4,
    orderId: '#VZ2108',
    img: avatar4,
    name: 'Prezy Mark',
    product: 'Furniture',
    amount: 199.0,
    vendor: 'Syntyce Solutions',
    status: 'Unpaid',
    statusClass: 'danger',
    rating: 4.3,
    votes: '47',
  },
  {
    id: 5,
    orderId: '#VZ2107',
    img: avatar6,
    name: 'Vihan Hudda',
    product: 'Bags and Wallets',
    amount: 330.0,
    vendor: 'iTest Factory',
    status: 'Paid',
    statusClass: 'success',
    rating: 4.7,
    votes: '161',
  },
];

const topCategories = [
  {
    id: 1,
    category: 'Mobile & Accessories',
    total: '10,294',
  },
  {
    id: 2,
    category: 'Desktop',
    total: '6,256',
  },
  {
    id: 3,
    category: 'Electronics',
    total: '3,479',
  },
  {
    id: 4,
    category: 'Home & Furniture',
    total: '2,275',
  },
  {
    id: 5,
    category: 'Grocery',
    total: '1,950',
  },
  {
    id: 6,
    category: 'Fashion',
    total: '1,582',
  },
  {
    id: 7,
    category: 'Appliances',
    total: '1,037',
  },
  {
    id: 8,
    category: 'Beauty, Toys & More',
    total: '924',
  },
  {
    id: 9,
    category: 'Food & Drinks',
    total: '701',
  },
  {
    id: 10,
    category: 'Toys & Games',
    total: '239',
  },
];

// Revenue Chart Data
const allRevenueData = [
  {
    name: 'Orders',
    type: 'area',
    data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
  },
  {
    name: 'Earnings',
    type: 'bar',
    data: [
      89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36,
      88.51, 36.57,
    ],
  },
  {
    name: 'Refunds',
    type: 'line',
    data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
  },
];

const monthRevenueData = [
  {
    name: 'Orders',
    type: 'area',
    data: [54, 85, 66, 18, 29, 31, 12, 14, 38, 72, 33, 27],
  },
  {
    name: 'Earnings',
    type: 'bar',
    data: [
      89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36,
      88.51, 36.57,
    ],
  },
  {
    name: 'Refunds',
    type: 'line',
    data: [18, 22, 27, 37, 41, 21, 15, 19, 27, 19, 22, 45],
  },
];

const halfYearRevenueData = [
  {
    name: 'Orders',
    type: 'area',
    data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
  },
  {
    name: 'Earnings',
    type: 'bar',
    data: [
      89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36,
      88.51, 36.57,
    ],
  },
  {
    name: 'Refunds',
    type: 'line',
    data: [8, 22, 87, 47, 41, 31, 5, 9, 47, 49, 32, 55],
  },
];

const yearRevenueData = [
  {
    name: 'Orders',
    type: 'area',
    data: [14, 35, 26, 38, 29, 31, 22, 24, 58, 32, 33, 77],
  },
  {
    name: 'Earnings',
    type: 'bar',
    data: [
      99.25, 88.58, 78.74, 118.87, 87.54, 94.03, 61.24, 58.57, 102.57, 62.36,
      48.51, 66.57,
    ],
  },
  {
    name: 'Refunds',
    type: 'line',
    data: [58, 42, 47, 57, 71, 21, 15, 69, 17, 39, 52, 55],
  },
];

export {
  agentsHeadersWithoutAction,
  allRevenueData,
  bestSellingProducts,
  brandlogo,
  ecomWidgets,
  ecommerceReports,
  edulogo,
  faqOptionsData,
  formBuilderAdvancedWidgets,
  formBuilderBasicWidgets,
  guardianProfileData,
  halfYearRevenueData,
  managerProfileData,
  monthRevenueData,
  orderSummary,
  playerProfileData,
  recentOrders,
  studentsHeadersWithoutAction,
  supperAdminWidgetsData,
  teamDummyImage,
  teamManagementWidgets,
  teamProfileData,
  topCategories,
  topSellers,
  trainerProfileData,
  universityHeadersWithoutAction,
  userDummyImage,
  yearRevenueData,
};
