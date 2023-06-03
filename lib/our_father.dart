import 'package:flutter/material.dart';

class OurFather extends StatelessWidget {
  const OurFather({super.key});

  @override
  Widget build(context) {
    return Center(
      child: RichText(
        text: const TextSpan(
          text: 'Our Father, who art in heaven,\n',
          style: TextStyle(
                color: Color.fromARGB(255, 98, 187, 235),
                fontSize: 25,
              ),
          children: <TextSpan>[
            TextSpan(
              text: 'hallowed be thy Name;\n',
              
            ),
            TextSpan(text: 'thy kingdom come;\n'),
            TextSpan(text: 'thy will be done;\n'),
            TextSpan(text: 'on earth as it is in heaven.\n'),
            TextSpan(text: 'Give us this day our daily bread.\n'),
            TextSpan(text: 'And forgive us our trespasses,\n'),
            TextSpan(text: 'as we forgive those\n'),
            TextSpan(text: 'who trespass against us.\n'),
            TextSpan(text: 'And lead us not into temptation,\n'),
            TextSpan(text: 'but deliver us from evil.\n'),
            TextSpan(text: 'Amen!'),
          ],
        ),
      ),
    );
  }
}
