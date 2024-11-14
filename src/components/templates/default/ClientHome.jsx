import TemplateLayout from '@/components/templates/TemplateLayout';
import HeroHome from '@/components/templates/default/home/HeroHome';
import HomeAbout from '@/components/templates/default/home/HomeAbout';
import HomePlayers from '@/components/templates/default/home/HomePlayers';
import HomeSeasonalGame from '@/components/templates/default/home/HomeSeasonalGame';
import HomeTeams from '@/components/templates/default/home/HomeTeams';
import HomeTrainingSchedule from '@/components/templates/default/home/HomeTrainingSchedule';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeShop from '@/components/templates/default/home/HomeShop';
import LoaderSpiner from '@/components/constants/Loader/Loader';
import HomeBlog from '@/components/templates/default/home/HomeBlog';
import HomeGallery from '@/components/templates/default/home/HomeGallery';
import { clientSingleEventsAction } from '@/slices/home/actions/clientEventsActions';
import HomeSponsors from './home/HomeSponsors';
import HomeGameSchedule from './home/HomeGameSchedule';
import HomeNoticeBoard from './home/HomeNoticeBoard';

export default function ClientHome() {
  const dispatch = useDispatch();
  const [eventsId, setEventsId] = useState('');
  const [showEvents, setShowEvents] = useState(false);
  const [subdomain, setSubdomain] = useState('');

  const {
    data: clientHomeData,
    isLoading: clientHomeLoading,
    error: clientHomeError,
  } = useSelector((state) => state.Home.clientHome);

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const { data: singleEventsData, isLoading: singleEventsIsLoading } =
    useSelector((state) => state.Home.clientSingleEvents);

  useEffect(() => {
    setSubdomain(window?.location?.hostname.split('.')[0]);
    if (eventsId && subdomain) {
      dispatch(
        clientSingleEventsAction({ subdomain: subdomain, id: eventsId })
      );
    }
  }, [dispatch, eventsId, subdomain]);

  const eventShow = (id) => {
    setEventsId(id);
    setShowEvents(!showEvents);
  };

  return (
    <>
      {themeIsLoading ? (
        <LoaderSpiner />
      ) : (
        <TemplateLayout>
          {clientHomeLoading ? (
            <LoaderSpiner />
          ) : (
            <>
              <HeroHome sliderData={clientHomeData?.sliders} />
              <HomeAbout about={clientHomeData?.aboutUs} />
              <HomeTeams teams={clientHomeData?.teams} />
              <HomePlayers
                players={
                  clientHomeData?.players?.length > 0 &&
                  clientHomeData?.players?.filter(
                    (player) => player?.payment_status === 'paid'
                  )
                }
              />
              <HomeNoticeBoard
                trainingSchedules={clientHomeData?.trainingSchedules}
              />
              <HomeSeasonalGame
                subdomain={subdomain}
                eventShow={eventShow}
                eventsId={eventsId}
              />
              <HomeGameSchedule />
              <HomeTrainingSchedule
                trainingSchedules={clientHomeData?.trainingSchedules}
              />
              <HomeShop />
              <HomeGallery gallery={clientHomeData?.gallery} />
              <HomeBlog news={clientHomeData?.news} />
              <HomeSponsors sponsorsData={clientHomeData?.sponsors} />
            </>
          )}
        </TemplateLayout>
      )}
    </>
  );
}
