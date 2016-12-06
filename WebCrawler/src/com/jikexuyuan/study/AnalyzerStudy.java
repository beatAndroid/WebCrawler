 /**  
 *@Description: 分词器demo
 */ 
package com.jikexuyuan.study;  

import java.io.StringReader;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.cjk.CJKAnalyzer;
import org.apache.lucene.analysis.core.KeywordAnalyzer;
import org.apache.lucene.analysis.core.SimpleAnalyzer;
import org.apache.lucene.analysis.core.StopAnalyzer;
import org.apache.lucene.analysis.core.WhitespaceAnalyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.apache.lucene.util.Version;
import org.wltea.analyzer.lucene.IKAnalyzer;
  
public class AnalyzerStudy {
	//需要处理的字符串
	private static String str = "极客学院，Lucene 案例 开发";
	
	/**
	 * @param analyzer
	 * @Author:lulei  
	 * @Description: 输出分词器处理结果
	 */
	public static void print(Analyzer analyzer){
		StringReader stringReader = new StringReader(str);
		try {
			TokenStream tokenStream = analyzer.tokenStream("", stringReader);
			//在这个版本中，必须调用这句话，要不会抛出异常
			tokenStream.reset();
			CharTermAttribute term = tokenStream.getAttribute(CharTermAttribute.class);
			System.out.println("分词技术" + analyzer.getClass());
			//循环输出分词结果
			while (tokenStream.incrementToken()) {
				System.out.print(term.toString() + "|");
			}
			System.out.println();
		} catch (Exception e) {
			// TODO Auto-generated catch block  
			e.printStackTrace();
		}
	}
	/**  
	 * @param args
	 * @Author:lulei  
	 * @Description:  
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub  
		Analyzer analyzer = null;
		
		//标准分词
		analyzer = new StandardAnalyzer(Version.LUCENE_43);
		AnalyzerStudy.print(analyzer);
		
		//IK分词
		analyzer = new IKAnalyzer();
		AnalyzerStudy.print(analyzer);
		
		//空格分词
		analyzer = new WhitespaceAnalyzer(Version.LUCENE_43);
		AnalyzerStudy.print(analyzer);
		
		//简单分词
		analyzer = new SimpleAnalyzer(Version.LUCENE_43);
		AnalyzerStudy.print(analyzer);
		
		//二分法分词
		analyzer = new CJKAnalyzer(Version.LUCENE_43);
		AnalyzerStudy.print(analyzer);
		
		//关键字分词
		analyzer = new KeywordAnalyzer();
		AnalyzerStudy.print(analyzer);
		
		//被忽略词分词
		analyzer = new StopAnalyzer(Version.LUCENE_43);
		AnalyzerStudy.print(analyzer);
	}

}
