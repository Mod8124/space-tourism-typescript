import Head from 'next/head';
import Particles from 'react-particles';
import ParticlesTheme from '../../src/helpers/ParticlesTheme';
import ParticlesFunction from '../../src/helpers/ParticlesFunctions';
import { useGetSpacesQuery } from '../../src/features/apiSlice';
import Cta from '../../src/components/cta';
import type { NextPage } from 'next';
import { IDestinations } from '../../src/interfaces/api/interface';
import Hook from '../../src/hooks/Hook';
import Image from 'next/image';
import { SectionStyled, ArticleCtaStyled, ArticleImgStyled, DivImgStyled, DivsPlanetsStyled, DivPlanetStyled, DivsInfoStyled, ParaStyled } from '../../src/pagesStyles/destination/destination.styles';

const Index:NextPage = () => {

  const { DestinationParticle } = ParticlesTheme();
  const { particlesInit , particlesLoaded } = ParticlesFunction();
  const { data, isLoading, isError}  = useGetSpacesQuery('destinations');
  const { index, changeIndex } = Hook();

  return (
    <main>
      <Head>
        <title>Space-tourism - Destination</title>
        <meta name="description" content="space Tourism" />
      </Head>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={
          DestinationParticle
        }
      />
      <SectionStyled>

        <ArticleImgStyled>
          <h2><span>01</span> Pick your destination </h2>
  
          <DivImgStyled
            animate={{rotate:[0, 180, 360,720]}}
            transition={{ duration:40, repeat: Infinity }}
          >
            {data && <Image src={data && data[index].images.webp} alt={data && data[index].name + 'img'} layout="fill" objectFit="contain"/>}
          </DivImgStyled>

        </ArticleImgStyled>

        <ArticleCtaStyled>
          <DivsPlanetsStyled>
            {data && data.map((data:IDestinations, i:number)=> (
              <DivPlanetStyled value={i} index={index} key={i + 'destinations'} onClick={()=> changeIndex(i)}>
                {data.name}
              </DivPlanetStyled>
            ))}
          </DivsPlanetsStyled>
          <Cta 
            title={data && data[index].name}
            para={data && data[index].description}
            type="destination"></Cta>

          <DivsInfoStyled>

            <div>
              <ParaStyled value="true">avg.distance</ParaStyled>
              <ParaStyled>{data && data[index].distance}</ParaStyled>
            </div>
            <div>
              <ParaStyled value="true">est.traveltime</ParaStyled>
              <ParaStyled>{data && data[index].travel}</ParaStyled>
            </div>

          </DivsInfoStyled>
        </ArticleCtaStyled>

      </SectionStyled>
    </main>
  );
};

export default Index;