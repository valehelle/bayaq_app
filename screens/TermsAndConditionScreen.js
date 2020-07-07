import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import Colors from '../constants/Colors'


const Title = ({ children }) => <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold', color: 'white' }}>{children}</Text>

const Content = ({ children }) => <Text style={{ fontSize: 15, marginTop: 10, color: 'white' }}>{children}</Text>
const SubContent = ({ children }) => <Text style={{ marginLeft: 10, fontSize: 15, marginTop: 10, color: 'white' }}>- {children}</Text>

export default function TermsAndConditionScreen({ navigation }) {

  return (
    <View className="scrollView" style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}><Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Bayaq</Text></TouchableOpacity>
        <Text style={{ marginTop: 20, color: 'white', fontSize: 14, fontWeight: 'bold' }}>Terms and Condition</Text>
        <Title>Welcome to Bayaq!</Title>
        <Content>These terms and conditions outline the rules and regulations for the use of BAYAQ PLT's Website located at https://www.bayaqapp.com, Android Application and iOS Application titled Bayaq.</Content>
        <Content>By accessing this Bayaq we assume you accept these terms and conditions. Do not continue to use Bayaq if you do not agree to take all of the terms and conditions stated on this page.</Content>
        <Content>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</Content>
        <Title>Cookies</Title>
        <Content>We employ the use of cookies. By accessing Bayaq, you agreed to use cookies in agreement with the BAYAQ PLT's Privacy Policy.</Content>
        <Content>Most interactive websites and application use cookies to let us retrieve the user’s details for each visit. Cookies are used by Bayaq to enable the functionality of certain areas to make it easier for people using Bayaq.</Content>
        <Title>License</Title>
        <Content>Unless otherwise stated, BAYAQ PLT and/or its licensors own the intellectual property rights for all material on Bayaq. All intellectual property rights are reserved. You may access this from Bayaq for your own personal use subjected to restrictions set in these terms and conditions.</Content>
        <Content>You must not:</Content>
        <SubContent>Republish material from Bayaq</SubContent>
        <SubContent>Sell, rent or sub-license material from Bayaq</SubContent>
        <SubContent>Reproduce, duplicate or copy material from Bayaq</SubContent>
        <SubContent>Redistribute content from Bayaq</SubContent>
        <Content>This Agreement shall begin on the date hereof.</Content>
        <Title>Hyperlinking to our Content</Title>
        <Content>The following organizations may link to our Website without prior written approval:</Content>
        <SubContent>Government agencies;</SubContent>
        <SubContent>Search engines;</SubContent>
        <SubContent>News organizations;</SubContent>
        <SubContent>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</SubContent>
        <SubContent>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</SubContent>
        <Content>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</Content>
        <Content>We may consider and approve other link requests from the following types of organizations:</Content>
        <SubContent>commonly-known consumer and/or business information sources;</SubContent>
        <SubContent>dot.com community sites;</SubContent>
        <SubContent>associations or other groups representing charities;</SubContent>
        <SubContent>online directory distributors;</SubContent>
        <SubContent>internet portals;</SubContent>
        <SubContent>accounting, law and consulting firms; and</SubContent>
        <SubContent>educational institutions and trade associations.</SubContent>
        <Content>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of BAYAQ PLT; and (d) the link is in the context of general resource information.</Content>
        <Content>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</Content>
        <Content>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to BAYAQ PLT. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</Content>
        <Content>Approved organizations may hyperlink to our Website as follows:</Content>
        <SubContent>By use of our corporate name; or</SubContent>
        <SubContent>By use of the uniform resource locator being linked to; or</SubContent>
        <SubContent>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</SubContent>
        <Content>No use of BAYAQ PLT's logo or other artwork will be allowed for linking absent a trademark license agreement.</Content>
        <Title>iFrames</Title>
        <Content>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</Content>
        <Title>Content Liability</Title>
        <Content>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</Content>
        <Title>Your Privacy</Title>
        <Content>Bayaq collects information directly from you for your registration, payment, transactions, and user profile. We also automatically collect from you your usage information, cookies and similar technologies, and device information, subject, where necessary, to your consent. We only collect the minimum amount of personal information necessary from you, unless you choose to provide more.</Content>
        <Title>Disclaimer</Title>
        <Content>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and application and the use of this website and application. Nothing in this disclaimer will:</Content>
        <SubContent>limit or exclude our or your liability for death or personal injury;</SubContent>
        <SubContent>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</SubContent>
        <SubContent>limit any of our or your liabilities in any way that is not permitted under applicable law; or</SubContent>
        <SubContent>exclude any of our or your liabilities that may not be excluded under applicable law.</SubContent>
        <Content>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</Content>
        <Content>We will not be hold responsible for any amount mistake that have been paid to the billers.</Content>
        <Content>Any refund should be decided by Bayaq.</Content>
        <Content>We will not be liable for any loss or damage of any nature.</Content>
      </ScrollView>

    </View>
  );
}

TermsAndConditionScreen.navigationOptions = {
  header: null,
};

TermsAndConditionScreen.path = 'privacy'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 20
  },
});
