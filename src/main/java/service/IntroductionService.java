package service;

import entity.IntroductionWithBLOBs;


public interface IntroductionService {
    int updateIntroduction(IntroductionWithBLOBs introductionWithBLOBs);
    IntroductionWithBLOBs selectIntroduction();
}
