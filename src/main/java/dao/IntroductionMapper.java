package dao;

import entity.Introduction;
import entity.IntroductionExample;
import entity.IntroductionWithBLOBs;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface IntroductionMapper {
    int countByExample(IntroductionExample example);

    int deleteByExample(IntroductionExample example);

    int deleteByPrimaryKey(int id);

    int insert(IntroductionWithBLOBs record);

    int insertSelective(IntroductionWithBLOBs record);

    List<IntroductionWithBLOBs> selectByExampleWithBLOBs(IntroductionExample example);

    List<Introduction> selectByExample(IntroductionExample example);

    IntroductionWithBLOBs selectByPrimaryKey(int id);

    int updateByExampleSelective(@Param("record") IntroductionWithBLOBs record, @Param("example") IntroductionExample example);

    int updateByExampleWithBLOBs(@Param("record") IntroductionWithBLOBs record, @Param("example") IntroductionExample example);

    int updateByExample(@Param("record") Introduction record, @Param("example") IntroductionExample example);

    int updateByPrimaryKeySelective(IntroductionWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(IntroductionWithBLOBs record);

    int updateByPrimaryKey(Introduction record);
}