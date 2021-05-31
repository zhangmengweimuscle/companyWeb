package dao;

import entity.Examples;
import entity.ExamplesExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ExamplesMapper {
    int countByExample(ExamplesExample example);

    int deleteByExample(ExamplesExample example);

    int deleteByPrimaryKey(int id);

    int insert(Examples record);

    int insertSelective(Examples record);

    List<Examples> selectByExampleWithBLOBs(ExamplesExample example);

    List<Examples> selectByExample(ExamplesExample example);

    Examples selectByPrimaryKey(int id);

    int updateByExampleSelective(@Param("record") Examples record, @Param("example") ExamplesExample example);

    int updateByExampleWithBLOBs(@Param("record") Examples record, @Param("example") ExamplesExample example);

    int updateByExample(@Param("record") Examples record, @Param("example") ExamplesExample example);

    int updateByPrimaryKeySelective(Examples record);

    int updateByPrimaryKeyWithBLOBs(Examples record);

    int updateByPrimaryKey(Examples record);
}